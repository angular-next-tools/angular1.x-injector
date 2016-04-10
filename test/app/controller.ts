'use strict'

import {injector} from 'ng-injector'
import {TestService} from './service'

@injector([
  '$scope',
  'TestService',
  '$ionicListDelegate'
])
export class TestView {
  TestService: TestService
  $ionicListDelegate: ionic.list.IonicListDelegate
  $scope: angular.IScope
  constructorArgs:any[]
  constructor(...args: any[]){
    this.constructorArgs = args
  }
}

@injector('$DotA')
export class TestView2{
  $DotA: any
}
