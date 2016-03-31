'use strict'

import {forEach} from './utils'

export type dependencis = string | string[]
export const bootstrapModules = []

; (function (window: Window) {
  let $ng = null
  Object.defineProperty(window, 'angular', {
    get() {
      return $ng
    },
    set(ng: angular.IAngularStatic) {
      if (typeof ng === 'object') {
        bootstrapReflect(ng)
        $ng = ng
      }
    },
    configurable: true,
    enumerable: true
  })
})(window)

function bootstrapReflect (ng: angular.IAngularStatic) {
  let $bootstrap: Function
  Object.defineProperty(ng, 'bootstrap', {
    get() {
      return $bootstrap
    },
    set(originBootstrapFn: Function) {
      $bootstrap = function (element: JQuery, modules: string | string[], bootstrapConfigFn?: angular.IAngularBootstrapConfig) {
        if (typeof modules === 'string') {
          bootstrapModules.push(modules)
        }else if (modules instanceof Array) {
          forEach(modules, module => {
            bootstrapModules.push(module)
          })
        }
        return originBootstrapFn.apply(null, arguments)
      }
    }
  })
}
