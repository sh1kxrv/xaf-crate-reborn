export class FileNotFoundError extends Error {
  constructor(path: string) {
    super(`Файл по пути не найден | ${path}`)
  }
}
