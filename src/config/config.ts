import _path from 'path'
import _fs from 'fs'
import { ModAlreadyInUse } from '~/exceptions/error.mod-already-in-use'

type ModID = string

export interface XafConfig {
  mods: ModID[]
  project_name: string
  template_id: string
}

export class XafConfigHandler {
  private config: XafConfig = {
    mods: [],
    project_name: null,
    template_id: null,
  }
  constructor(project_name: string, template_id: string, mods: string[] = []) {
    this.config.project_name = project_name
    this.config.template_id = template_id
    this.config.mods = mods
  }

  json() {
    return JSON.stringify(this.config, null, 2)
  }

  save(path: string) {
    const config_path = _path.resolve(path, 'xaf.config.json')
    _fs.writeFileSync(config_path, this.json(), { encoding: 'utf-8' })
  }

  add_mod(mod_id: string) {
    if (this.config.mods.includes(mod_id)) throw new ModAlreadyInUse(mod_id)
    this.config.mods.push(mod_id)
    return this
  }

  get<T = string>(key: string, defaultValue: T = null) {
    return (this.config[key] as T) ?? defaultValue
  }

  set(key: string, value: unknown) {
    this.config[key] = value
  }

  static read(raw_json: string) {
    // todo: safe-json parse
    const parsed_config: XafConfig = JSON.parse(raw_json) as unknown as XafConfig
    const cfg = new XafConfigHandler(parsed_config.project_name, parsed_config.template_id, parsed_config.mods)
    return cfg
  }
}
