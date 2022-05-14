import path from 'path'
import fs from 'fs'

import { XafConfigHandler } from '~/config/config'
import { NotFoundTemplateConfig } from '~/exceptions/error.template-config'

export function read_template_config(
  working_directory: string
): XafConfigHandler {
  const config_path = path.resolve(working_directory, 'xaf.config.json')
  if (!fs.existsSync(config_path)) throw new NotFoundTemplateConfig(config_path)
  const raw = fs.readFileSync(config_path, { encoding: 'utf-8' })
  return XafConfigHandler.read(raw)
}
