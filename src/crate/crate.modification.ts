import path from 'path'
import { cwd } from 'process'

import { Crate } from '.'
import { ModificationConfig } from './modification/interfaces'
import { XafConfigHandler } from '~/config/config'

import create_patch_prompt from '~/prompts/prompts.modification'
import { Modification } from './modification/modification.helper'
import { read_template_config } from './utils/template'

interface ModificationPrompt {
  mod_ids: string[]
}

export class CrateModification extends Crate<ModificationConfig> {
  config: XafConfigHandler
  constructor(private working_directory: string = cwd()) {
    super('../modifications', 'manifest.json')
    this.config = read_template_config(working_directory)

    const units = this.units.map((unit) => unit.config)
    const generated_prompt = create_patch_prompt(
      units,
      this.config.get('template_id')
    )
    this.attach_prompt(generated_prompt)
  }

  async boot(): Promise<void> {
    const prompt_data = await this.show_prompt<ModificationPrompt>()
    if (!prompt_data) return

    for (const patch_id of prompt_data.mod_ids) {
      const unit_config = this.unit(patch_id)
      const modificator = new Modification(
        unit_config,
        this.config,
        this.working_directory
      )
      await modificator.modificate()
    }
  }
}
