'use strict'

import {TestService} from '../app/service'
import {TestView, TestView2} from '../app/controller'

const expect = chai.expect

chai.should()

export default describe('Test Injector', () => {

  let controller: angular.IControllerService
  let ionicListDelegate: ionic.list.IonicListDelegate
  let scope: angular.IScope
  let TestViewInstance: TestView
  let testService: TestService
  let q: angular.IQService
  let TestView2Factory: Function

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
      TestViewInstance = $controller<TestView>('TestView as TestCtrl', {$scope: scope})
      TestView2Factory = () => {
          $controller<TestView2>('TestView2 as TestCtrl2', {$scope: scope})
      }
      testService = TestService
      q = $q
    })
  })

  it('inject deps to controller should ok', () => {
    expect(TestViewInstance.$scope).to.equal(scope)
    expect(TestViewInstance.$ionicListDelegate).to.equal(ionicListDelegate)
  })

  it('inject deps to service should ok', () => {
    expect(testService.$q.toString()).to.deep.equal(q.toString())
  })

  it('no parameter will be passed to constructor function', () => {
    expect(TestViewInstance.constructorArgs.length).to.equal(0)
  })

  it('should have thrown an error when inject a non-existent service', () => {
    expect(TestView2Factory).to.throw(Error)
  })

  it('keep prototype chain working as before', () => {
    let testFn = () => {}
    TestView.prototype['fn'] = testFn
    expect(TestViewInstance['fn']).to.equal(testFn)
  })
})
