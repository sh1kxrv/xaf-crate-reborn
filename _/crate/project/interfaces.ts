import { UnitConfig } from '../interfaces/interface.config'

export interface ProjectConfig extends UnitConfig {
  // Hidden in prompt
  disabled?: boolean
  hint?: string
}
