#!/usr/bin/env node
/**
 * Prints the environment variables for the admin account.
 *
 *   npm run admin:password -- 'your-password-here'
 *
 * Copy the output into .env (locally) and into the runtime .env on the EC2 host
 * (the file GitLab CI copies to $APP_ENV_DIR/.env). The password itself is
 * never stored — only the scrypt hash of it.
 *
 * The hash fields are colon-separated rather than using the conventional `$`:
 * Next reads .env through dotenv-expand, which treats `$...` as a variable
 * reference and would silently truncate the value at the first one.
 *
 * Kept as a plain script rather than importing src/lib/auth.ts so it runs under
 * bare `node`, with no TypeScript or Next.js involved.
 */
import { randomBytes, scryptSync } from 'node:crypto';

const password = process.argv[2];

if (!password || password.length < 12) {
  console.error("Usage: npm run admin:password -- '<password of at least 12 characters>'");
  process.exit(1);
}

const salt = randomBytes(16);
const key = scryptSync(password, salt, 64);

console.log('');
console.log('ADMIN_PASSWORD_HASH="scrypt:' + salt.toString('hex') + ':' + key.toString('hex') + '"');
console.log('');
console.log('# A fresh AUTH_SECRET, in case you need one as well.');
console.log('# Changing it signs every existing session out.');
console.log('AUTH_SECRET="' + randomBytes(32).toString('hex') + '"');
console.log('');
