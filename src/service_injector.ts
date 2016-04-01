'use strict'
import {dependencis} from './utils'

export const serviceInjector = (deps: dependencis = []) => {
  if (typeof deps === 'string') {
    deps = [<string>deps]
  } else if (!(deps instanceof Array)) {
    throw new Error('deps must be Array')
  }

  return (target: any) => {
    let construct: any = function (args: any[]) {
        args.forEach((arg, i) => this[deps[i]] = arg)
    }
    construct.prototype = target.prototype

    let f = function(...args){
      return new construct(args)
    }

    f.$inject = <string[]>deps
    f.prototype = target.prototype
    return f
  }
}
