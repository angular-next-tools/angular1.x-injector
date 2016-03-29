'use strict'
import * as path from 'path'
import * as browserSync from 'browser-sync'
import {bundle} from '../build/build'
const reload = browserSync.reload

let initBrowserSync = false

bundle(true, () => {
  if (initBrowserSync) return reload()
  initBrowserSync = true
  browserSync({
    notify: false,
    port: 5001,
    server: {
      baseDir: ['www'],
      routes: {
        '/node_modules': path.join(process.cwd(), 'node_modules'),
        '/www': path.join(process.cwd(), 'www')
      }
    }
  })
})

