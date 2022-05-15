const Module = require('./module')

class ModuleExtension {
  constructor() {
    /**
     * @type {Module[]}
     */
    this.modules = []
  }

  load(...args) {
    for (const module of this.modules) {
      module.register(...args)
    }
    return this
  }

  /**
   * @param {Module} module
   */
  use(...module) {
    this.modules.push(...module)
    return this
  }
}

module.exports = ModuleExtension
