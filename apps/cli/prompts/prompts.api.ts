import _path from 'path'
import _fs from 'fs'
import { cwd } from 'process'
export default [
  {
    type: 'text',
    name: 'path',
    message: 'Введите путь до файла',
    validate: (path) => {
      const resolved_path = _path.resolve(cwd(), path)
      return !_fs.existsSync(resolved_path) ? 'Файл не найден!' : true
    },
    initial: 'data/openapi.json',
  },
  {
    type: 'text',
    name: 'api',
    message: 'Введите основной URL вашего API',
    initial: 'https://easyus.app',
  },
  // {
  //   type: 'text',
  //   name: 'name',
  //   message: 'Enter your project name',
  //   initial: 'easyus',
  // },
]
