import crypto from 'crypto'

export const SALT = 'YgybVWHQVHZL2UgHJIg6sA=='

export function hash(str: string) {
  return crypto.pbkdf2Sync(str, SALT, 1000, 64, 'sha512').toString('hex')
}

export function equals_hash(str: string, _hash: string) {
  const hashed = hash(str)
  return hashed === _hash
}
