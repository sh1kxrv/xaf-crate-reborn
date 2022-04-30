export function generateHash(): string {
  return Math.random()
    .toString(36)
    .substring(2, 12)
    .replace(/[0-9]+/i, '')
}
