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
  constructorArgs:any[]
  constructor(...args){
      this.constructorArgs = args
  }
}

@ctrlInjector('$DotA')
export class TestView2{
    $DotA: any
}
