import { Router } from 'vue-router'
import { Store } from 'vuex'
import { ViewRegister } from '~/_register'

import HomeView from './home'

export default function (router: Router, store: Store<any>) {
  new ViewRegister(store, router).register_all(HomeView)
}
