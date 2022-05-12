type Edit = {
  [key: string]: object
}
export interface PatchConfig {
  id: string
  name: string
  edit?: Edit
}
