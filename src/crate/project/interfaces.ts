type PatchID = string

export interface ProjectConfig {
  id: string
  name: string
  patches: PatchID[]
}
