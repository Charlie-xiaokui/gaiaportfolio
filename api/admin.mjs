import {
  authenticated,
  checkPassword,
  clientHash,
  configured,
  cookieName,
  database,
  issueSession,
  json,
  sameOrigin,
} from '../server/analytics.mjs';

export default async function handler(req, res) {
  if (!configured()) return json(res, 503, { error: '统计后台尚未配置完成，请设置服务端环境变量并执行建表脚本。' });
  try {
    if (req.method === 'GET') return json(res, authenticated(req) ? 200 : 401, { authenticated: authenticated(req) });
    if (req.method !== 'POST' || !sameOrigin(req)) return json(res, 403, { error: '请求未获授权' });
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (body?.action === 'logout') {
      res.setHeader('Set-Cookie', cookieName + '=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
      return json(res, 200, { ok: true });
    }
    // Persistent rate limit also covers concurrent serverless instances.
    const allowed = await database('rpc/portfolio_take_rate_limit', {
      method: 'POST',
      body: JSON.stringify({ bucket: 'login:' + clientHash(req), maximum: 5, window_seconds: 900 }),
    });
    if (!allowed) return json(res, 429, { error: '尝试次数过多，请 15 分钟后重试。' });
    if (!checkPassword(body?.password)) return json(res, 401, { error: '密码不正确' });
    issueSession(res);
    return json(res, 200, { ok: true });
  } catch {
    return json(res, 503, { error: '服务暂时不可用，请检查数据库配置。' });
  }
}
