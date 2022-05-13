import path from 'path'
import { cwd } from 'process'
import fs from 'fs'

import { Crate } from '.'
import { PatchConfig } from './patches/interfaces'
import { XafConfigHandler } from '~/config/config'

import create_patch_prompt from '~/prompts/prompts.patch'
import { Patch } from './patches/patch.helper'
import { successfully } from '~/utils/logger'

interface PatchPrompt {
  patch_id: string
}

export class CratePatch extends Crate<PatchConfig> {
  config: XafConfigHandler
  constructor(private working_directory: string = cwd()) {
    const patches_path = path.resolve(__dirname, '../patches')
    super(patches_path, 'patch.config.json')

    this.config = this.read_template_config()

    const units = this.units.map((unit) => unit.config)
    const generated_prompt = create_patch_prompt(
      units,
      this.config.get('template_id')
    )
    this.attach_prompt(generated_prompt)
  }

  private read_template_config(): XafConfigHandler {
    const config_path = path.resolve(this.working_directory, 'xaf.config.json')
    if (!fs.existsSync(config_path))
      throw Error(`Конфиг в текущем шаблоне не обнаружен | ${config_path}`)
    const raw = fs.readFileSync(config_path, { encoding: 'utf-8' })
    return XafConfigHandler.read(raw)
  }

  async boot(): Promise<void> {
    const prompt_data = await this.show_prompt<PatchPrompt>()
    if (!prompt_data) return

    const unit_config = this.unit(prompt_data.patch_id)
    const patch = new Patch(unit_config, this.config, this.working_directory)
    await patch.patch()
    successfully('Patched!')
  }
}
