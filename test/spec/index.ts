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
  let testService: TestService
  let q: angular.IQService

  beforeEach(() => {
    angular.mock.module('App')

    angular.mock.inject((
      $rootScope: angular.IRootScopeService,
      $controller: angular.IControllerService,
      $ionicListDelegate: ionic.list.IonicListDelegate,
      $q: angular.IQService,
      TestService: TestService
    ) => {
      controller = $controller
      scope = $rootScope.$new()
      ionicListDelegate = $ionicListDelegate
      TestView = $controller<TestView>('TestView as TestCtrl', {$scope: scope})
      testService = TestService
      q = $q
    })
  })

  it('inject deps to controller should ok', () => {
    expect(TestView.$scope).to.equal(scope)
    expect(TestView.$ionicListDelegate).to.equal(ionicListDelegate)
  })

  it('inject deps to service should ok', () => {
    expect(testService.$q.toString()).to.deep.equal(q.toString())
  })

})
