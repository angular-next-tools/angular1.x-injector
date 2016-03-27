import * as path from 'path'

const webpack = require('webpack')

export const bundle = (watch?: boolean) => {
  const config = {
    entry: {
      app: path.join(process.cwd(), 'test/index.ts'),
      lib: ['angular']
    },
    output: {
      filename: 'app.js',
      path: path.join(process.cwd(), 'www/')
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: 'ts-loader'
        }
      ]
    },
    ts: {
      configFileName: path.join(process.cwd(), 'tools/build/bundle.json'),
      silent: true
    },
    devtool: 'source-map',
    watch: !!watch,
    devServer: {
      port: 8087
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js')
    ]
  }

  return new webpack(config, (err, stats) => {
    console.log('[webpack]', stats.toString())
  })
}
