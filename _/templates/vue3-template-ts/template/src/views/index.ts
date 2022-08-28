import { Router } from 'vue-router'
import { ViewRegister } from '~/_register'

import HomeView from './home'

export default function (router: Router) {
  new ViewRegister(router).register_all(HomeView)
}
