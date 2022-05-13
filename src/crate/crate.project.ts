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

    const units = this.units.map((unit) => unit.config)
    const generated_prompt = create_project_prompt(units)
    this.attach_prompt(generated_prompt)
  }
  async boot(): Promise<void> {
    const prompt_result = await this.show_prompt<ProjectPrompt>()
    if (!prompt_result) return

    const unit_config = this.unit(prompt_result.type)
    const project = new Project(unit_config, prompt_result.name)

    await project.scaffold()
  }
}
