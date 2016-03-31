'use strict'
import {dependencis} from './utils'

export const ctrlInjector = (deps: dependencis = []) => {
  if (typeof deps === 'string') {
    deps = [<string>deps]
  } else if (!(deps instanceof Array)) {
    throw new Error('deps must be Array')
  }

  return (target: any) => {
    const original = target

    function construct(constructor: Function, $injector: any, $scope: angular.IScope) {
      const Componment : any = function () {
        this.$scope = $scope
        angular.forEach(deps, dep => {
          try {
            if (dep !== '$scope') this[dep] = $injector.get(dep)
          }catch (e) {
            console.error(`get dependency: ${dep} fail`)
          }
        })
        return constructor.call(this, $injector, $scope)
      }
      Componment.prototype = constructor.prototype
      return new Componment()
    }

    const f : any = function ($injector: any, $scope: angular.IScope) {
      return construct(original, $injector, $scope)
    }

    f.$inject = ['$injector', '$scope']
    f.prototype = original.prototype
    return f
  }
}
