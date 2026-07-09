import { describe, it, expect } from 'vitest';
import { decodeJwt } from './jwt';

function makeToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const b64url = (obj) => {
    const json = JSON.stringify(obj);
    const utf8Escaped = encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
    return btoa(utf8Escaped).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  return `${b64url(header)}.${b64url(payload)}.fakesignature`;
}

describe('decodeJwt', () => {
  it('decodes a valid token payload', () => {
    const token = makeToken({ id: 42, role: 'admin', exp: 9999999999 });
    expect(decodeJwt(token)).toEqual({ id: 42, role: 'admin', exp: 9999999999 });
  });

  it('handles special/unicode characters in the payload', () => {
    const token = makeToken({ name: 'Ünïcödé é€' });
    expect(decodeJwt(token).name).toBe('Ünïcödé é€');
  });

  it('returns null for a malformed token', () => {
    expect(decodeJwt('not-a-real-token')).toBeNull();
  });

  it('returns null for an empty string', () => {
    expect(decodeJwt('')).toBeNull();
  });
});
