import _fs from 'fs'
import _path from 'path'
import { cwd } from 'process'

import { XafConfigHandler } from '~/config/config'
import { AbstractLayer } from '../interfaces/interface.config'
import { PatchConfig } from './interfaces'
import { copy } from '~/utils/file'
import { initialize } from '~/pm/index'
import ora from 'ora'

export class Patch {
  constructor(
    private unit_config: AbstractLayer<PatchConfig>,
    private project_config: XafConfigHandler,
    private working_directory = cwd()
  ) {}
  async patch() {
    this.copy_patch()
    this.edit()
    this.dependencies()
  }
  /**
   * Копирование `patch` директории рядом с конфигом
   */
  private copy_patch() {
    const patch_path = _path.resolve(this.unit_config.path, 'patch')
    copy(patch_path, this.working_directory)
  }

  private read_json<T = any>(path: string) {
    const raw = _fs.readFileSync(path, { encoding: 'utf-8' })
    return JSON.parse(raw) as T
  }

  private write_json(path: string, json: any) {
    _fs.writeFileSync(path, JSON.stringify(json, null, 2), {
      encoding: 'utf-8',
    })
  }
  /**
   * Изменение .json файлов в директории проекта
   * Todo: Поддержка других форматов
   */
  private edit() {
    const edit_section = this.unit_config.config.edit
    if (!edit_section) return
    for (const relative_path of Object.keys(edit_section)) {
      const full_path = _path.resolve(this.working_directory, relative_path)
      const json = this.read_json(full_path)

      const section_content = edit_section[relative_path]
      for (const key of Object.keys(section_content)) {
        if (!json[key]) {
          json[key] = edit_section[key]
        } else {
          if (typeof json[key] === 'object') {
            json[key] = { ...json[key], ...section_content[key] }
          } else if (Array.isArray(json[key])) {
            json[key].push(...section_content[key])
          }
        }
      }

      this.write_json(full_path, json)
    }
  }
  /**
   * Установка зависимостей
   */
  private async dependencies() {
    const pm = await initialize()
    const dependencies = this.unit_config.config?.install ?? []
    const dev_dependencies = this.unit_config.config?.devInstall ?? []

    const spinner = ora({
      text: 'Загрузка зависимостей',
    }).start()

    if (dependencies) await pm.install(dependencies)
    if (dev_dependencies) await pm.install(dev_dependencies, true)

    spinner.succeed(
      `Зависимости '${this.unit_config.config.name}' установлены!`
    )
  }
}
