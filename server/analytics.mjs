import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const cookieName = '__Host-portfolio_admin';
export function configured() {
  return Boolean(
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.ADMIN_SESSION_SECRET &&
    process.env.ADMIN_PASSWORD_HASH,
  );
}
export function json(res, status, value) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.status(status).json(value);
}
export function sameOrigin(req) {
  const origin = req.headers.origin;
  const expected = process.env.APP_ORIGIN || 'https://gaiadai.xyz';
  return origin === expected;
}
export function digest(value) {
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(value).digest('hex');
}
export function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
export function authenticated(req) {
  if (!process.env.ADMIN_SESSION_SECRET) return false;
  const cookies = (req.headers.cookie || '').split(';').map((part) => part.trim());
  const token = cookies.find((part) => part.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
  if (!token) return false;
  const [expires, nonce, signature] = token.split('.');
  return Boolean(
    expires &&
    nonce &&
    signature &&
    Number(expires) > Date.now() &&
    safeEqual(signature, digest(expires + '.' + nonce)),
  );
}
export function issueSession(res) {
  const payload = Date.now() + 8 * 60 * 60 * 1000 + '.' + randomBytes(24).toString('hex');
  res.setHeader(
    'Set-Cookie',
    cookieName + '=' + payload + '.' + digest(payload) + '; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800',
  );
}
export function checkPassword(password) {
  const [salt, hash] = (process.env.ADMIN_PASSWORD_HASH || '').split(':');
  if (!salt || !hash || typeof password !== 'string' || password.length > 256) return false;
  return safeEqual(scryptSync(password, salt, 64).toString('hex'), hash);
}
export async function database(path, options = {}) {
  const response = await fetch(process.env.SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/' + path, {
    ...options,
    signal: AbortSignal.timeout(10000),
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      ...(process.env.SUPABASE_SERVICE_ROLE_KEY.startsWith('sb_secret_')
        ? {}
        : { Authorization: 'Bearer ' + process.env.SUPABASE_SERVICE_ROLE_KEY }),
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error('Database request failed');
  return response.status === 204 ? null : response.json();
}
export function clientHash(req) {
  // Vercel sets x-forwarded-for from the network request.
  const address = String(req.headers['x-forwarded-for'] || '')
    .split(',')[0]
    .trim();
  return digest(address || 'unknown');
}
export function deviceInfo(agent) {
  const device = /ipad|tablet/i.test(agent) ? '平板' : /mobile|iphone|android/i.test(agent) ? '手机' : '电脑';
  const os = /iphone|ipad/i.test(agent)
    ? 'iOS'
    : /android/i.test(agent)
      ? 'Android'
      : /windows/i.test(agent)
        ? 'Windows'
        : /macintosh|mac os/i.test(agent)
          ? 'macOS'
          : /linux/i.test(agent)
            ? 'Linux'
            : '未知系统';
  const browser = /edg\//i.test(agent)
    ? 'Edge'
    : /firefox|fxios/i.test(agent)
      ? 'Firefox'
      : /chrome|crios/i.test(agent)
        ? 'Chrome'
        : /safari/i.test(agent)
          ? 'Safari'
          : '其他浏览器';
  return { device, os, browser };
}
export function locationHeader(req, name) {
  try {
    return decodeURIComponent(String(req.headers[name] || '')).slice(0, 100);
  } catch {
    return '';
  }
}
