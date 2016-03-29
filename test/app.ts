'use strict'

import {TestView} from './app/controller'
import {TestService} from './app/service'

angular.module('App.Service', [])
  .service('TestService', TestService)

export default angular.module('App', ['ionic', 'App.Service'])
  .controller('TestView', TestView)

// export default angular.bootstrap(angular.element(document.body), ['App'])
