'use strict'

import {injector} from '../src'

@injector([
  'TestService'
])
export class TestView {
  private TestService: TestService

  constructor() {
    console.log(this.TestService.getName())
  }
}

export class TestService {
  getName() {
    return 'TestService'
  }
}

angular.module('App', ['App.Service'])
  .controller('TestView', TestView)

angular.module('App.Service', [])
  .service('TestService', TestService)

angular.bootstrap(angular.element(document.body), ['App'])
