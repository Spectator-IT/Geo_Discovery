const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    infrastructureLogging: {
      level: 'none'
    }
  },
  devServer: {
    client: {
      overlay: false
    },
    setupMiddlewares: function(middlewares, devServer) {
      devServer.app.use(function(req, res, next) {
        next()
      })
      return middlewares
    }
  }
})