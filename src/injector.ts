'use strict'
import {forEach} from './utils'
import {ngModules} from './ng_modules'

export const injector = (deps: string[]) => {
  if (!deps) deps = []
  if (!(deps instanceof Array)) throw new Error('deps must be Array')
  return (target: any) => {
    const original = target

    function construct(constructor: Function, $scope: angular.IScope) {
      const Controller : any = function () {
        constructor.$inject = ['$scope']
        this.$scope = $scope
        const injector = angular.injector(ngModules)
        forEach(deps, dep => {
          try {
            this[dep] = injector.get(dep)
          }catch (e) {}
        })
        return constructor.call(this, $scope)
      }
      Controller.prototype = constructor.prototype
      return new Controller()
    }

    const f : any = function ($scope: angular.IScope) {
      return construct(original, $scope)
    }

    f.prototype = original.prototype

    return f
  }
}
