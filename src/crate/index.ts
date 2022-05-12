import { Prompt } from '~/prompts/prompt'
import { AbstractConfig, find } from '~/utils/crate/find'
import { angry } from '~/utils/logger'

export class Crate<Config> {
  protected units: AbstractConfig<Config>[]
  private prompt: Prompt

  constructor(search_path: string, config_name: string) {
    this.units = find<Config>(search_path, config_name)
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

  async boot(...args: any[]): Promise<void> {}
}
