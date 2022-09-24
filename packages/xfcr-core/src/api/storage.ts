export interface StorageInterface {
  set(key: string, value: unknown): void
  get<T>(key: string): T | null
  exists(key: string): boolean
  remove(key: string): void
}
