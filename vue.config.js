const merge = require('merge')

module.exports = {
  /* lintOnSave: false,
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js'
      // ...other Workbox options...
    }
  }, */
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'sass-loader',
              options: {
                importer: function (url, prev) {
                  console.log('tell me')
                  if (url.indexOf('@material') === 0) {
                    var filePath = url.split('@material')[1];
                    var nodeModulePath = `./node_modules/@material/${filePath}`
                    return { file: require('path').resolve(nodeModulePath) }
                  }
                  return { file: url }
                }
              }
            }
          ]
        }
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('scss')
      .use('sass-loader')
      .tap(options =>
        merge(options, {
          importer: function (url, prev) {
            console.log('please')
            if (url.indexOf('@material') === 0) {
              var filePath = url.split('@material')[1];
              var nodeModulePath = `./node_modules/@material/${filePath}`
              return { file: require('path').resolve(nodeModulePath) }
            }
            return { file: url }
          }
        })
      )
  }
}
