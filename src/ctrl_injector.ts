'use strict'
import {dependencis} from './utils'

export const ctrlInjector = (deps: dependencis = []) => {
  if (typeof deps === 'string') {
    deps = [<string>deps]
  } else if (!(deps instanceof Array)) {
    throw new Error('deps must be Array')
  }

  return (target: any) => {
    function construct($injector: any, $scope: angular.IScope) {
      const Componment : any = function () {
        (<string[]>deps).forEach(dep => {
            try {
              if (dep !== '$scope') this[dep] = $injector.get(dep)
            } catch (e) {
              console.error(`get dependency: ${dep} fail`)
            }
        })
        this.$scope = $scope
        return target.call(this)
      }
      Componment.prototype = target.prototype
      return new Componment()
    }

    const f : any = function ($injector: any, $scope: angular.IScope) {
      return construct($injector, $scope)
    }

    f.$inject = ['$injector', '$scope']
    f.prototype = target.prototype
    return f
  }
}
