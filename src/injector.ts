'use strict'
import {dependencis, forEach} from './utils'

export const injector = (deps: dependencis = []) => {
  if (typeof deps === 'string') {
    deps = [<string>deps]
  } else if (!(deps instanceof Array)) {
    throw new Error('deps must be Array')
  }

  return (target: any) => {
    const construct: any = function (args: any[]): any {
      const Component: any = function () {
        forEach(args, (arg: any, i: number) => this[deps[i]] = arg)
        return target.call(this)
      }
      Component.prototype = target.prototype
      return new Component()
    }

    const f = function(...args: any[]){
      return construct(args)
    }

    f.$inject = <string[]>deps
    f.prototype = target.prototype
    return f
  }
}
