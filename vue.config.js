const path = require('path')
const merge = require('webpack-merge')

module.exports = {
  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: true,

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        merge(options, {
          loaders: {
            scss: [
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  includePaths: [path.resolve(__dirname, './node_modules')]
                }
              }
            ]
          }
        })
      )
  }
}
