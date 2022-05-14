import _fs from 'fs'
import _path from 'path'
import { cwd } from 'process'

import { XafConfigHandler } from '~/config/config'
import { AbstractLayer } from '../interfaces/interface.config'
import { PatchConfig } from './interfaces'
import { copy } from '~/utils/file'
import { initialize } from '~/pm/index'
import ora from 'ora'
import { read_json, write_json } from '~/utils/json'
import { angry } from '~/utils/logger'

export class Patch {
  constructor(
    private unit_config: AbstractLayer<PatchConfig>,
    private project_config: XafConfigHandler,
    private working_directory = cwd()
  ) {}
  async patch() {
    try {
      this.project_config.add_patch(this.unit_config.config.id)
      this.copy_patch()
      this.edit()
      await this.dependencies()
    } catch (err) {
      angry(err.message)
    }
  }
  /**
   * Копирование `patch` директории рядом с конфигом
   */
  private copy_patch() {
    const patch_path = _path.resolve(this.unit_config.path, 'patch')
    copy(patch_path, this.working_directory)
  }

  /**
   * Изменение .json файлов в директории проекта
   * Todo: Поддержка других форматов
   * Refactor
   */
  private edit() {
    const edit_section = this.unit_config.config.edit
    if (!edit_section) return
    // * Перебор файлов в секции 'edit'
    // * - relative path: путь до файла относительно корневой директории проекта
    for (const relative_path of Object.keys(edit_section)) {
      const full_path = _path.resolve(this.working_directory, relative_path)
      const json = read_json(full_path)

      const section_properties = edit_section[relative_path]
      for (const property_key of Object.keys(section_properties)) {
        const dest_property = json[property_key]

        if (!dest_property) {
          json[property_key] = edit_section[property_key]
          continue
        }

        const section_property = section_properties[property_key]
        const is_object = typeof dest_property === 'object'
        const is_array = Array.isArray(dest_property)

        if (is_object) {
          const concatinated_property = {
            ...dest_property,
            ...section_property,
          }
          Reflect.set(json, property_key, concatinated_property)
        } else if (is_array) {
          json[property_key].push(...section_property)
        }
      }

      write_json(full_path, json)
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
      text: `Установка патча ${this.unit_config.config.name}`,
    }).start()

    if (dependencies)
      await pm.install(dependencies, false, this.working_directory)
    if (dev_dependencies)
      await pm.install(dev_dependencies, true, this.working_directory)

    spinner.succeed(`'${this.unit_config.config.name}' установлен!`)
  }
}
