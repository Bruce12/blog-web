const path = require('path')
const watch = require('node-watch')
const dirTree = require('directory-tree')
const glob = require('glob')
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 3002 // TODO: get this variable from setting.ts
const mockServerPort = 3001 // TODO: get this variable from setting.ts
const name = '测试' // TODO: get this variable from setting.ts

// 多入口模式
function getEntry(globPath) {
  let entries = {}; let tmp; let moduleName
  glob.sync(globPath).forEach(function(entry) {
    tmp = entry.split('/').splice(-3)
    moduleName = tmp[tmp.length - 2] === 'blog' ? 'app' : tmp[tmp.length - 2]
    entries[moduleName] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.ts',
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
      title: moduleName,
      filename: moduleName === 'app' ? 'index.html' : moduleName + path.extname(tmp[tmp.length - 1]),
      chunks: ['chunk-libs', 'chunk-elementUI', 'chunk-commons', 'runtime', moduleName]
    }
  })
  return entries
}
let pages = getEntry('./src/pages/**?/*.html')
module.exports = {
  publicPath: '',
  lintOnSave: true,
  pages,
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api': {
        target: `http://127.0.0.1:7001`,
        // target: ``,
        router: function(req) {
          // let url = req.url.replace(/\/$/, '')
          // url = [url, req.method].join(':')
          // for (var i = 0; i < apis.length; i++) {
          //   if (apis[i].test(url)) {
          //     return `http://localhost:${mockServerPort}`
          //   }
          // }
          return ``
        },
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': ''
        },
        ws: false // proxy websockets
      }
    }
  },
  // webpack配置
  configureWebpack: {
    performance: {
      maxEntrypointSize: 3072000,
      maxAssetSize: 3072000
    },
    output: {
      filename: 'js/[name].js?v=[hash:6]',
      chunkFilename: 'js/[name].js?v=[hash:6]'
    }
  },
  // pwa: {
  //   name: name,
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js')
  //   }
  // },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.less')
      ]
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)

    // https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: path.resolve(__dirname, 'src/components'),
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
    for (let key in pages) {
      config.plugins.delete('prefetch-' + key)
      config.plugins.delete('preload-' + key)
    }
    if (process.env.NODE_ENV === 'report') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
}
