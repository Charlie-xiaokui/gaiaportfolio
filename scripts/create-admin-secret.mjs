import { randomBytes, scryptSync } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const password = randomBytes(24).toString('base64url');
const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');
const file = process.argv[2];
if (!file) throw new Error('Provide an absolute output path outside the repository.');
writeFileSync(
  file,
  'ADMIN_PASSWORD=' +
    password +
    '\nADMIN_PASSWORD_HASH=' +
    salt +
    ':' +
    hash +
    '\nADMIN_SESSION_SECRET=' +
    randomBytes(32).toString('hex') +
    '\n',
  { mode: 0o600, flag: 'wx' },
);
console.log('Saved administrator credentials in ' + file);
