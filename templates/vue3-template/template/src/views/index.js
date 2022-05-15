import { ViewRegister } from '~/_register'

import HomeView from './home'

export default function (router, store) {
  new ViewRegister(store, router).register_all(HomeView)
}
