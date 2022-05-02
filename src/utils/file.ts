import * as fs from 'fs'
import * as path from 'path'

/**
 * Копирование файлов из директории A в директорию B
 * Поддерживает рекурсивное копирование
 * @param {string} src
 * @param {string} target
 */
export function copy(src: string, target: string) {
  const files = fs.readdirSync(src)
  for (const file_path of files) {
    const full_path = path.resolve(src, file_path)
    const new_target_path = path.resolve(target, file_path)
    const stats = fs.statSync(full_path)
    if (stats.isDirectory()) {
      if (!fs.existsSync(new_target_path))
        fs.mkdirSync(new_target_path, { recursive: true })
      copy(full_path, new_target_path)
    } else {
      fs.copyFileSync(full_path, new_target_path)
    }
  }
}

/**
 * Производит глубокое ( рекурсивное ) чтение путей из директории
 * @param {string} target
 */
export function* deep_readdir(target: string): Generator<string> {
  const files = fs.readdirSync(target)
  for (const file_name of files) {
    const full_path = path.resolve(target, file_name)
    const stats = fs.statSync(full_path)
    if (stats.isDirectory()) yield* deep_readdir(full_path)
    yield full_path
  }
}
