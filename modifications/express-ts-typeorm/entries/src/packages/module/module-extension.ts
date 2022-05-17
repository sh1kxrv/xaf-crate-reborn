import Module from './module'

export default class ModuleExtension {
  modules: Module[]
  constructor() {
    this.modules = []
  }

  load(...args) {
    for (const module of this.modules) {
      module.register(...args)
    }
    return this
  }

  use(...module: Module[]) {
    this.modules.push(...module)
    return this
  }
}
