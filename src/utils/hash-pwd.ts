import * as crypto from 'crypto';

const _SALT = crypto.randomBytes(8).toString('hex');

export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac('sha512', _SALT);
    hmac.update(p);
    return hmac.digest('hex');
}