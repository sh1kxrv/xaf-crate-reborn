import { AbstractLayer } from '~/crate/interfaces/interface.config'
import { ProjectConfig } from '../interfaces'

export class Processor {
  constructor() {}
  async process(
    project_name: string,
    project_path: string,
    unit_config: AbstractLayer<ProjectConfig>
  ): Promise<void> {}
}
