import fs from 'fs'
import path from 'path'

/**
 * @param {string} src
 * @param {string} target
 */
export function copy(src, target) {
  const files = fs.readdirSync(src)
  for (const file_path of files) {
    const stat = fs.lstatSync(file_path)
    const relative = path.relative(src, file_path)
    if (stat.isDirectory()) {
      const new_directory = path.resolve(target, relative)
      fs.mkdirSync(new_directory)
      copy(target, new_directory)
    } else {
      fs.copyFileSync(target, relative)
    }
  }
}
