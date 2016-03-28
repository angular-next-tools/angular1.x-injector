'use strict'

import {ctrlInjector} from '../../src'
import {TestService} from './service'

@ctrlInjector([
  'TestService',
  '$ionicListDelegate'
])
export class TestView {
  TestService: TestService
  $ionicListDelegate: ionic.list.IonicListDelegate
  $scope: angular.IScope
}