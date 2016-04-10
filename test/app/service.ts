'use strict'

import {injector} from 'ng-injector'

@injector('$q')
export class TestService {
  $q: angular.IQService

  getName() {
    return 'TestService'
  }
}
