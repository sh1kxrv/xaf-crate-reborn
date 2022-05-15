import path from 'path'
import { Crate } from '.'
import { ProjectConfig } from './project/interfaces'
import create_project_prompt from '~/prompts/prompts.project'
import { Project } from './project/project.helper'
import { CrateModification } from './crate.modification'
import ora from 'ora'
import { initialize } from '~/pm/'

interface ProjectPrompt {
  type: string
  name: string
  patching: boolean
  dependencies: boolean
}

export class CrateProject extends Crate<ProjectConfig> {
  constructor() {
    super('../templates', 'project.options.json')

    const units = this.units.map((unit) => unit.config)
    const generated_prompt = create_project_prompt(units)
    this.attach_prompt(generated_prompt)
  }
  async boot(): Promise<void> {
    const prompt_result = await this.show_prompt<ProjectPrompt>()
    if (!prompt_result) return

    const { patching, dependencies, name } = prompt_result

    const unit_config = this.unit(prompt_result.type)
    const project = new Project(unit_config, name)
    const { project_path } = await project.scaffold()

    if (dependencies) {
      const pm = await initialize()
      const spinner = ora({
        text: 'Загрузка зависимостей',
      }).start()
      await pm.install_only(project_path)
      spinner.succeed('Загрузка зависимостей завершена')
    }

    if (patching) {
      const patch_crate = new CrateModification(project_path)
      await patch_crate.boot()
    }
  }
}
