type Inject = {
  [key: string]: object
}

type Dependency = string
export interface PatchConfig {
  id: string
  name: string
  inject?: Inject
  devInstall: Dependency[]
  install: Dependency[]
  compatibles: string[] | string
}
