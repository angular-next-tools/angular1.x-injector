'use strict'

import {serviceInjector} from 'ng-injector'

@serviceInjector([
  '$q'
])
export class TestService {

  $q: angular.IQService

  getName() {
    return 'TestService'
  }
}