import { UnitConfig } from '../interfaces/interface.config'

type PatchID = string
export interface ProjectConfig extends UnitConfig {
  // Available patches
  patches: PatchID[]

  // Hidden in prompt
  hidden?: boolean
}
