'use strict'

import {ngModules} from './ng_modules'

const origin = angular.module

export default angular.module = function () {
  if(arguments.length > 1) {
    const moduleName = arguments[0]
    if(typeof moduleName === 'string' && ngModules.indexOf(moduleName) === -1) ngModules.push(moduleName)
  }
  return origin.apply(null, arguments)
}
