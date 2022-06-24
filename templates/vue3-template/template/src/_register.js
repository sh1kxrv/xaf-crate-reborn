/**
 * @typedef XafView
 * @property {string} name - имя view
 * @property {any[]?} routes - руты
 * @property {any[]?} store
 */

export class ViewRegister {
  constructor(router) {
    this.router = router
  }

  /**
   * Зарегистрировать view
   * @param {string} name - имя view
   * @param {XafView} view - view
   */
  register(name, view) {
    if (view.routes) {
      for (let route of view.routes) {
        this.router.addRoute(route)
      }
    }
  }

  /**
   * Зарегистрировать массив из views
   * @param  {...XafView} views
   */
  register_all(...views) {
    for (let view of views) {
      this.register(view.name, view)
    }
  }
}
