import prompts from 'prompts'
import { angry, hello } from '~/utils/logger'
export class Prompt {
  private prompt: any
  constructor(prompt: any) {
    this.prompt = prompt
  }
  async show() {
    let isCanceled = false
    const data = await prompts(this.prompt, {
      onCancel: () => !(isCanceled = true),
    })

    console.clear()
    hello()
    if (isCanceled) {
      angry('Задача отменена')
      return null
    }

    return data
  }
}
