'use strict'

import {ctrlInjector} from 'ng-injector'
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