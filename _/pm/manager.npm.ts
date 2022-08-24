import { Manager } from './manager'

export class NPMManager extends Manager {
  constructor() {
    super('npm', 'install', 'uninstall', '--save-dev')
  }
}
