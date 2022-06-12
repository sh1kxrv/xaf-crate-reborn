/**
 * @typedef XafView
 * @property {string} name - имя view
 * @property {any[]?} routes - руты
 * @property {any[]?} store
 */

import { Router } from 'vue-router'
import { Store } from 'vuex'

export class ViewRegister {
  constructor(private vuex: Store<any>, private router: Router) {}

  /**
   * Зарегистрировать view
   * @param {string} name - имя view
   * @param {XafView} view - view
   */
  register(name: string, view: any) {
    if (view.store) this.vuex.registerModule(name, view.store)
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
  register_all(...views: any[]) {
    for (let view of views) {
      this.register(view.name, view)
    }
  }
}
