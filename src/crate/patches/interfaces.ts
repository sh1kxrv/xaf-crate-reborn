type Edit = {
  [key: string]: object
}

type Dependency = string
export interface PatchConfig {
  id: string
  name: string
  edit?: Edit
  devInstall: Dependency[]
  install: Dependency[]
  compatibles: string[] | string
}
