require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getMainStatus', function(req, res){
  res.json({
    type:'xxxxxxxx'
  })
})
app.use('/api',apiRoutes)
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

var context = config.dev.context

switch(process.env.NODE_ENV){
    //case 'local': var proxypath = 'http://localhost:8001'; break;
    // case 'local': var proxypath = 'http://localhost:8080/backend/'; break;
    // case 'online': var proxypath = 'http://localhost:8080/backend/'; break;
    // case 'local': var proxypath = 'http://15.65.67.52:8080/backend/'; break;
    // case 'online': var proxypath = 'http://15.65.67.52:8080/backend/'; break;
    case 'local': var proxypath = 'http://15.65.67.33:8080/RMS/'; break;
    case 'online': var proxypath = 'http://15.65.67.33:8080/RMS/'; break;
    // case 'local': var proxypath = 'http://15.65.67.81:8080/RMS/'; break;
    // case 'online': var proxypath = 'http://15.65.67.81:8080/RMS/'; break;
  }
var options = {
    target: proxypath,
    changeOrigin: true,
    secure: false,
    onProxyRes( proxyRes, req, res ){
      let cookies = proxyRes.headers['set-cookie']

      if ( cookies == null || cookies.length == 0 ) {
        delete  proxyRes.headers['set-cookie']
        return
      }

      for ( let i = 0, n = cookies.length; i < n; i++ ){
        if ( cookies[i].match(/^JSESSIONID=[^;]+;[\s\S]*Path=\/[^;]+/) ) {
          cookies[i] = cookies[i].replace(/Path=\/[^;]+/, 'Path=/');
        }
      }
      proxyRes.headers['set-cookie'] = cookies;
    },
    historyApiFallback: true
}
if (context.length) {
    app.use(proxyMiddleware(context, options))
}
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://15.65.67.52:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
