import { UnitConfig } from '../interfaces/interface.config'

type Inject = Record<string, object>

type Dependency = string
export interface ModificationConfig extends UnitConfig {
  inject?: Inject
  devInstall: Dependency[]
  install: Dependency[]
  compatibles: string[] | string
  conflicts?: string[]
  commands_before_install?: string[]
  commands_after_install?: string[]
}
