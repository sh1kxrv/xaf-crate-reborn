export class NotFoundTemplateConfig extends Error {
  constructor(path: string) {
    super(`Конфиг в текущем шаблоне не обнаружен | ${path}`)
  }
}
