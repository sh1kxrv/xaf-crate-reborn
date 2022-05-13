import _path from 'path'
import _fs from 'fs'

export interface XafConfig {
  installed_patches: string[]
  project_name: string
  template_id: string
}

export class XafConfigHandler {
  private config: XafConfig = {
    installed_patches: [],
    project_name: null,
    template_id: null,
  }
  constructor(
    project_name: string,
    template_id: string,
    installed_patches: string[] = []
  ) {
    this.config.project_name = project_name
    this.config.template_id = template_id
    this.config.installed_patches = installed_patches
  }

  json() {
    return JSON.stringify(this.config, null, 2)
  }

  save(path: string) {
    const config_path = _path.resolve(path, 'xaf.config.json')
    _fs.writeFileSync(config_path, this.json(), { encoding: 'utf-8' })
  }

  add_patch(patch_id: string) {
    if (this.config.installed_patches.includes(patch_id))
      throw Error(`Патч '${patch_id}' уже используется`)
    this.config.installed_patches.push(patch_id)
  }

  get<T = string>(key: string) {
    return this.config[key] as T
  }

  set(key: string, value: any) {
    this.config[key] = value
  }

  static read(raw_json: string) {
    const parsed_config: XafConfig = JSON.parse(raw_json)
    const cfg = new XafConfigHandler(
      parsed_config.project_name,
      parsed_config.template_id,
      parsed_config.installed_patches
    )
    return cfg
  }
}
