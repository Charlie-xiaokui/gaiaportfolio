import {
  authenticated,
  clientHash,
  configured,
  database,
  deviceInfo,
  json,
  locationHeader,
  sameOrigin,
} from '../server/analytics.mjs';

export default async function handler(req, res) {
  if (!configured()) return json(res, 503, { error: '统计服务尚未配置' });
  try {
    if (req.method === 'GET') {
      if (!authenticated(req)) return json(res, 401, { error: '请先登录' });
      const days = Number(req.query?.days || 7);
      if (![1, 7, 30].includes(days)) return json(res, 400, { error: '时间范围无效' });
      const since = new Date(Date.now() - days * 86400000).toISOString();
      const result = await database('rpc/portfolio_visit_report', {
        method: 'POST',
        body: JSON.stringify({ since_time: since }),
      });
      return json(res, 200, result);
    }
    if (req.method !== 'POST' || !sameOrigin(req)) return json(res, 403, { error: '请求未获授权' });
    if (authenticated(req)) return json(res, 200, { ok: true });
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (
      JSON.stringify(body || {}).length > 2048 ||
      !/^[a-f0-9-]{36}$/i.test(body?.session || '') ||
      typeof body?.path !== 'string' ||
      !body.path.startsWith('/') ||
      body.path.startsWith('//') ||
      body.path.length > 300
    ) {
      return json(res, 400, { error: '访问事件无效' });
    }
    const path = body.path.split(/[?#]/)[0];
    if (/^\/(admin|api)(\/|$)/.test(path)) return json(res, 200, { ok: true });
    const agent = String(req.headers['user-agent'] || '').slice(0, 500);
    if (/bot|crawler|spider|headless/i.test(agent)) return json(res, 200, { ok: true });
    const allowed = await database('rpc/portfolio_take_rate_limit', {
      method: 'POST',
      body: JSON.stringify({ bucket: 'visit:' + clientHash(req), maximum: 120, window_seconds: 60 }),
    });
    if (!allowed) return json(res, 429, { error: '请求过于频繁' });
    await database('rpc/portfolio_record_visit', {
      method: 'POST',
      body: JSON.stringify({
        visit_session: body.session,
        visit_path: path,
        visit_device: deviceInfo(agent).device,
        visit_os: deviceInfo(agent).os,
        visit_browser: deviceInfo(agent).browser,
        visit_country: locationHeader(req, 'x-vercel-ip-country'),
        visit_city: locationHeader(req, 'x-vercel-ip-city'),
        page_view: body.type === 'pageview',
      }),
    });
    return json(res, 200, { ok: true });
  } catch {
    return json(res, 503, { error: '统计服务暂时不可用' });
  }
}
