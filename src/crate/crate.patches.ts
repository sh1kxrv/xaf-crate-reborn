import path from 'path'
import { cwd } from 'process'

import { Crate } from '.'
import { PatchConfig } from './patches/interfaces'
import { XafConfigHandler } from '~/config/config'

import create_patch_prompt from '~/prompts/prompts.patch'
import { Patch } from './patches/patch.helper'
import { read_template_config } from './utils/template'

interface PatchPrompt {
  patch_ids: string[]
}

export class CratePatch extends Crate<PatchConfig> {
  config: XafConfigHandler
  constructor(private working_directory: string = cwd()) {
    const patches_path = path.resolve(__dirname, '../patches')
    super(patches_path, 'patch.config.json')

    this.config = read_template_config(working_directory)

    const units = this.units.map((unit) => unit.config)
    const generated_prompt = create_patch_prompt(
      units,
      this.config.get('template_id')
    )
    this.attach_prompt(generated_prompt)
  }

  async boot(): Promise<void> {
    const prompt_data = await this.show_prompt<PatchPrompt>()
    if (!prompt_data) return

    for (const patch_id of prompt_data.patch_ids) {
      const unit_config = this.unit(patch_id)
      const patch = new Patch(unit_config, this.config, this.working_directory)
      await patch.patch()
    }
  }
}
