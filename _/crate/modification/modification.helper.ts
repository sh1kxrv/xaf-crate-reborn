import _fs from 'fs'
import _path from 'path'
import { cwd } from 'process'

import { XafConfigHandler } from '~/config/config'
import { AbstractLayer } from '../interfaces/interface.config'
import { ModificationConfig } from './interfaces'
import { copy } from '~/utils/file'
import { initialize } from '~/pm/index'
import ora from 'ora'
import { read_json, write_json } from '~/utils/json'
import { angry } from '~/utils/logger'
import { deep_merge } from '~/utils/'

export class Modification {
  constructor(
    private unit_config: AbstractLayer<ModificationConfig>,
    private project_config: XafConfigHandler,
    private working_directory = cwd()
  ) {}
  async modificate() {
    try {
      this.project_config
        .add_mod(this.unit_config.config.id)
        .save(this.working_directory)

      this.copy_mod()
      this.inject()
      await this.dependencies()
    } catch (err) {
      angry(err.message)
    }
  }
  /**
   * Копирование `entries` директории рядом с конфигом
   */
  private copy_mod() {
    const patch_path = _path.resolve(this.unit_config.path, 'entries')
    copy(patch_path, this.working_directory)
  }

  /**
   * Изменение .json файлов в директории проекта
   * Todo: Поддержка других форматов
   */
  private inject() {
    const inject_section = this.unit_config.config.inject
    if (!inject_section) return
    // * Перебор файлов в секции 'edit'
    // * - relative path: путь до файла относительно корневой директории проекта
    for (const relative_path of Object.keys(inject_section)) {
      const full_path = _path.resolve(this.working_directory, relative_path)
      const json = read_json(full_path)

      const section_properties = inject_section[relative_path]
      const merged_json = deep_merge(json, section_properties)

      write_json(full_path, merged_json)
    }
  }
  /**
   * Установка зависимостей
   */
  private async dependencies() {
    const pm = await initialize()

    const execute_commands = async (commands: string[]) => {
      for (const command of commands) {
        await pm.execute(command)
      }
    }

    const dependencies = this.unit_config.config.install ?? []
    const dev_dependencies = this.unit_config.config.devInstall ?? []
    const commands_before_install =
      this.unit_config.config.commands_before_install ?? []
    const commands_after_install =
      this.unit_config.config.commands_after_install ?? []

    const spinner = ora({
      text: `Установка модификации:: '${this.unit_config.config.name}'`,
    }).start()

    if (dependencies)
      await pm.install(dependencies, false, this.working_directory)
    if (dev_dependencies)
      await pm.install(dev_dependencies, true, this.working_directory)
    if (commands_before_install) {
      await execute_commands(commands_before_install)
    }
    if (commands_after_install) {
      await execute_commands(commands_after_install)
    }

    spinner.succeed(
      `Модификация '${this.unit_config.config.name}' установлена!`
    )
  }
}
