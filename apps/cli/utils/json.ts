import _fs from 'fs'

export function read_json<T = any>(path: string) {
  const raw = _fs.readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(raw) as T
}

export function write_json(path: string, json: any) {
  _fs.writeFileSync(path, JSON.stringify(json, null, 2), {
    encoding: 'utf-8',
  })
}
