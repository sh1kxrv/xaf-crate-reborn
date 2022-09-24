import { StorageInterface } from '../api/storage'

class _Storage implements StorageInterface {
  private storage: Record<string, unknown> = {}

  set(key: string, value: unknown): void {
    this.storage[key] = value
  }
  get<T>(key: string): T | null {
    return this.storage[key] as T | null
  }
  exists(key: string): boolean {
    return !!this.storage[key]
  }
  remove(key: string): void {
    delete this.storage[key]
  }
}

const Storage = new _Storage()
export { Storage }
