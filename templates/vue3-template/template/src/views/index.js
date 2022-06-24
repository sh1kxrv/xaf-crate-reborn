import { ViewRegister } from '~/_register'

import HomeView from './home'

export default function (router) {
  new ViewRegister(router).register_all(HomeView)
}
