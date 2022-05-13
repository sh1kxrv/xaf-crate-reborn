import { Manager } from './manager'

export class YarnManager extends Manager {
  constructor() {
    super('yarn', 'add', 'remove')
  }
}
