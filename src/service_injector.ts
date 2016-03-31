'use strict'
import {dependencis} from './utils'

export const serviceInjector = (deps: dependencis = []) => {
  if (typeof deps === 'string') {
    deps = [<string>deps]
  } else if (!(deps instanceof Array)) {
    throw new Error('deps must be Array')
  }

  return (target: Function) => {
    let f = function(...args){
      args.forEach((arg, i) => this[deps[i]] = arg)
      return target.call(this)
    }

    f.prototype = target.prototype
    f.$inject = <string[]>deps
    return f
  }
}
