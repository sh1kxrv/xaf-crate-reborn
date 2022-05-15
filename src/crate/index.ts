import _path from 'path'

import { Prompt } from '~/prompts/prompt'
import { find } from '~/crate/utils/find'
import { angry } from '~/utils/logger'
import { AbstractLayer, UnitConfig } from './interfaces/interface.config'

export class Crate<Config extends UnitConfig> {
  protected units: AbstractLayer<Config>[]
  private prompt: Prompt

  constructor(search_directory: string, config_name: string) {
    const search_full_path = _path.resolve(__dirname, search_directory)
    this.units = find<Config>(search_full_path, config_name)
  }

  attach_prompt(prompt_options: any = null) {
    if (prompt_options) this.prompt = new Prompt(prompt_options)
  }

  show_prompt<T = any>(): Promise<T> {
    if (!this.prompt) {
      angry(
        'Опциональный диалог не был задан при инициализации ящика | используйте attach_prompt'
      )
      return
    }
    return this.prompt.show()
  }

  unit(id: string) {
    return this.units.find((unit) => unit.config.id === id)
  }

  async boot(...args: any[]): Promise<void> {}
}
