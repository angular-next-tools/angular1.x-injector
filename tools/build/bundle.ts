'use strict'

import * as fs from 'fs'
import * as uglify from 'uglify-js'

const rollup  = require('rollup')
const babel   = require('rollup-plugin-babel')
const version = process.env.VERSION || require('../../package.json').version

const banner =
  '/*!\n' +
  ' * ng-injector v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Yinan\n' +
  ' * Released under the MIT License.\n' +
  ' */'

rollup.rollup({
  entry: 'lib/es2015/index.js',
  plugins: [
    babel({
      presets: [ 'es2015-rollup' ]
    })
  ]
})
.then(bundle => {
  return Promise.all([
    bundleUMD(bundle),
    bundleCJS(bundle)
  ])
})
.catch(reason => {
  console.error(reason)
})

function bundleCJS (bundle: any) {
  return new Promise(resolve => {
    const code = bundle.generate({
      format: 'cjs',
      banner: banner
    }).code

    return write('lib/injector.js', code).then(resolve)
  })
}

function bundleUMD (bundle: any) {
  return new Promise(resolve => {
    const code = bundle.generate({
      format: 'umd',
      banner: banner,
      moduleName: 'injector'
    }).code

    const minified = banner + '\n' + uglify.minify(code, {
      fromString: true,
      output: <any>{
        ascii_only: true
      }
    }).code

    return write('lib/injector.umd.js', minified).then(resolve)
  })
}

function write (dest: string, code: string) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

function getSize (code: string) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue (str: string) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
