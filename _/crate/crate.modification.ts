import { cwd } from 'process'

import { Crate } from '.'
import { ModificationConfig } from './modification/interfaces'
import { XafConfigHandler } from '~/config/config'

import create_patch_prompt from '~/prompts/prompts.modification'
import { Modification } from './modification/modification.helper'
import { read_template_config } from './utils/template'
import { angry } from '~/utils/logger'

interface ModificationPrompt {
  mod_ids: string[]
}

// Refactor: To Utils
interface CheckResult {
  ok: boolean
  unit: ModificationConfig | null
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

  private conflicts_checker(mod_ids: string[]): CheckResult {
    const units = mod_ids.map((id) => this.unit(id).config)
    for (const unit of units) {
      const conflict = units.some(
        (u) => u.conflicts.includes(unit.id) ?? false
      )
      if (conflict)
        return {
          unit,
          ok: false,
        }
    }
    return {
      unit: null,
      ok: true,
    }
  }

  async boot(): Promise<void> {
    const prompt_data = await this.show_prompt<ModificationPrompt>()
    if (!prompt_data) return

    const { ok, unit } = this.conflicts_checker(prompt_data.mod_ids)
    if (!ok) {
      const conflicts = unit.conflicts.join(' ')
      angry(
        `Замечены конфликтующие модификации '${unit.id}:: ${conflicts}', ещё раз проверьте указанные вами модификации`
      )
      return
    }

    for (const mod_id of prompt_data.mod_ids) {
      const unit_config = this.unit(mod_id)
      const modificator = new Modification(
        unit_config,
        this.config,
        this.working_directory
      )
      await modificator.modificate()
    }
  }
}
