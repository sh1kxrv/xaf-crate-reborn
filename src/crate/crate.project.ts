import path from 'path'
import { Crate } from '.'
import { ProjectConfig } from './project/interfaces'
import create_project_prompt from '~/prompts/prompts.project'

interface ProjectPrompt {
  type: string
  name: string
}

export class CrateProject extends Crate<ProjectConfig> {
  constructor() {
    const templates_path = path.resolve(__dirname, '../templates')
    super(templates_path, 'crate.options.json')

    this.attach_prompt(
      create_project_prompt(this.units.map((cfg) => cfg.config))
    )
  }
  async boot(): Promise<void> {
    console.log('crate project units:', this.units)
    const prompt_result = await this.show_prompt<ProjectPrompt>()
    console.log(prompt_result)
  }
}
