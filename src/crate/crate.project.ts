import path from 'path'
import { Crate } from '.'
import { ProjectConfig } from './project/interfaces'
import create_project_prompt from '~/prompts/prompts.project'
import { Project } from './project/project.helper'

interface ProjectPrompt {
  type: string
  name: string
}

export class CrateProject extends Crate<ProjectConfig> {
  constructor() {
    const templates_path = path.resolve(__dirname, '../templates')
    super(templates_path, 'project.options.json')

    this.attach_prompt(
      create_project_prompt(this.units.map((unit) => unit.config))
    )
  }
  async boot(): Promise<void> {
    const prompt_result = await this.show_prompt<ProjectPrompt>()

    const unit_config = this.unit(prompt_result.type)
    const project = new Project(unit_config, prompt_result.name)

    await project.scaffold()
  }
}
