type Inject = {
  [key: string]: object
}

type Dependency = string
export interface ModificationConfig {
  id: string
  name: string
  inject?: Inject
  devInstall: Dependency[]
  install: Dependency[]
  compatibles: string[] | string
}
