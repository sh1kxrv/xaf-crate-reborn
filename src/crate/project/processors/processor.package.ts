import { AbstractLayer } from '~/crate/interfaces/interface.config'
import { ProjectConfig } from '../interfaces'
import { Processor } from './processor'

import _path from 'path'
import _fs from 'fs'
import { angry } from '~/utils/logger'

export class PackageProcessor extends Processor {
  async process(
    project_name: string,
    project_path: string,
    unit_config: AbstractLayer<ProjectConfig>
  ): Promise<void> {
    const package_json_path = _path.resolve(project_path, 'package.json')
    if (!_fs.existsSync(package_json_path)) {
      angry(`package.json не найден | '${package_json_path}'`)
      return
    }

    // Todo: Типизация package.json
    const parsed_package_json: any = require(package_json_path)
    parsed_package_json.name = project_name

    const stringified = JSON.stringify(parsed_package_json, null, 2)

    _fs.writeFileSync(package_json_path, stringified, {
      encoding: 'utf-8',
    })
  }
}
