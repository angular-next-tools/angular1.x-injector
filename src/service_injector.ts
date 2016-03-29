'use strict'
import {forEach} from './utils'
import {bootstrapModules} from './ng_patch'

let ngApps: NodeListOf<Element>

export const serviceInjector = (deps: string []) => {
  if (!deps) deps = []
  if (!(deps instanceof Array)) throw new Error('deps must be Array')
  return (target: any) => {
    angular.element(document).ready(() => {
      ngApps = document.querySelectorAll('[ng-app]')
      angular.forEach(ngApps, (ele: Element) => {
        const appName = ele.getAttribute('ng-app')
        if (bootstrapModules.indexOf(appName) === -1) bootstrapModules.push(appName)
      })
      forEach(bootstrapModules, module => {
        if (!deps.length) return
        angular.module(module).run(['$injector', ($injector: any) => {
          forEach(deps, (dep: string, index: number) => {
            try {
              target.prototype[dep] = $injector.get(dep)
              deps.splice(index, 1)
            } catch (error) {
              console.error(`get dep: ${dep} failed`)
            }
          })
        }])
      })
    })
  }
}
