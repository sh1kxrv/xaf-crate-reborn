import { AbstractLayer } from '~/crate/interfaces/interface.config'
import { ProjectConfig } from '../interfaces'
import { Processor } from './processor'

import _path from 'path'
import _fs from 'fs'
import { read_json, write_json } from '~/utils/json'
import { FileNotFoundError } from '~/exceptions/error.file-not-found'

export class PackageProcessor extends Processor {
  async process(
    project_name: string,
    project_path: string,
    unit_config: AbstractLayer<ProjectConfig>
  ): Promise<void> {
    const package_json_path = _path.resolve(project_path, 'package.json')
    if (!_fs.existsSync(package_json_path)) {
      throw new FileNotFoundError(package_json_path)
    }

    // Todo: Типизация package.json
    const json = read_json(package_json_path)
    json.name = project_name
    write_json(package_json_path, json)
  }
}
