import { UnitConfig } from '../interfaces/interface.config'

type PatchID = string
export interface ProjectConfig extends UnitConfig {
  patches: PatchID[]
}
