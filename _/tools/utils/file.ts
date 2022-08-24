export class File {
  #file = []

  add(str: string) {
    this.#file.push(str)
    return this
  }

  skip() {
    this.add('')
    return this
  }

  /**
   * Получить полноценный файл
   */
  get() {
    return this.#file.join('\n')
  }
}
