export interface UnitConfig {
  id: string
  name: string
}

export interface AbstractLayer<E> {
  config: E
  path: string
}
