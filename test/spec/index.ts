'use strict'

import {TestService} from '../app/service'
import {TestView} from '../app/controller'

const expect = chai.expect

chai.should()

export default describe('Test Injector', () => {

  let controller: angular.IControllerService
  let ionicListDelegate: ionic.list.IonicListDelegate
  let scope: angular.IScope
  let TestView: TestView
  let q: angular.IQService

  it('inject deps to controller should ok', () => {

    angular.mock.module('App')

    angular.mock.inject((
      $rootScope: angular.IRootScopeService,
      $controller: angular.IControllerService,
      $ionicListDelegate: ionic.list.IonicListDelegate,
      $q: angular.IQService
    ) => {
      controller = $controller
      scope = $rootScope.$new()
      ionicListDelegate = $ionicListDelegate
      TestView = $controller<TestView>('TestView as TestCtrl', {$scope: scope})
      q = $q
    })

    expect(TestView.$scope).to.equal(scope)
    expect(TestView.TestService).instanceof(TestService)
    expect(TestView.$ionicListDelegate).to.equal(ionicListDelegate)
  })

})
