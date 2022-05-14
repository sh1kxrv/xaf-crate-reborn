import _fs from 'fs'
import _path from 'path'
import { cwd } from 'process'
import { XafConfigHandler } from '~/config/config'

import { copy } from '~/utils/file'
import { AbstractLayer } from '../interfaces/interface.config'
import { ProjectConfig } from './interfaces'

import { Processor } from './processors/processor'
import { PackageProcessor } from './processors/processor.package'

import { CratePatch } from '../crate.patches'
import { successfully } from '~/utils/logger'

export class Project {
  private preprocessors: Processor[] = []
  private postprocessors: Processor[] = [new PackageProcessor()]
  private project_path: string
  private config: XafConfigHandler = null

  constructor(
    private unit_config: AbstractLayer<ProjectConfig>,
    private project_name: string,
    private current_working_directory = cwd()
  ) {
    this.project_path = _path.resolve(
      this.current_working_directory,
      this.project_name
    )
    this.config = new XafConfigHandler(
      this.project_name,
      this.unit_config.config.id
    )
  }

  private copy() {
    const template_path = _path.resolve(this.unit_config.path, 'template')
    copy(template_path, this.project_path)
  }

  public async scaffold() {
    await this.pre()
    this.copy()
    await this.post()
    this.config.save(this.project_path)
    successfully('Шаблон успешно сгенерирован!')
    return {
      project_path: this.project_path,
    }
  }

  private pre() {
    return this.process(this.preprocessors)
  }

  private post() {
    return this.process(this.postprocessors)
  }

  private async process(processors = this.preprocessors) {
    for (const processor of processors) {
      await processor.process(
        this.project_name,
        this.project_path,
        this.unit_config
      )
    }
  }
}
