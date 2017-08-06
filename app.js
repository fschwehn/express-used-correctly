global.log = console.log
global.logj = x => console.log(JSON.stringify(x, null, '    '))

const express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')

var app = express();

/**
 * set locals
 *
 * app.locals will be inherited by each req.locals
 */
app.locals.title = 'express used correctly'

/**
 * apply settings
 */
app.set('env', process.env.RUNTIME_CONFIG || 'development')
app.set('x-powered-by', false)
app.set('json spaces', '  ')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * enable view cache in production
 */
if (app.get('env') == 'production') {
  app.set('view cache', true)
}

// uncomment to log all app settings:
// for (const key of ['case sensitive routing', 'env', 'etag', 'jsonp callback name', 'json replacer', 'json spaces', 'query parser', 'strict routing', 'subdomain offset', 'trust proxy', 'views', 'view cache', 'view engine', 'x-powered-by', ]) { log(`app.get('${key}') = ${app.get(key)}`) }

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/**
 * dynamically load a logger for different runtime configs
 */
const loggerName = process.env.LOGGER || app.get('env')
if (loggerName != 'none')
  app.use(require('./loggers/' + loggerName))

/**
 * install body and cookie parsers
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * serve public static content first
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * serve a single page
 */
app.get('/', (req, res, next) => res.render('generic', { pageTitle: 'home' }))

/**
 * serve a route that provides both GET and POST
 * 
 * use req.path to redirect to the middleware's mount point
 */
app.route('/blog')
  .get((req, res, next) => res.render('blog', { pageTitle: 'blog' }))
  .post((req, res, next) => {
    // after processing the post, redirect to the route's path
    res.redirect(req.baseUrl + req.path)
  })

/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

/**
  * error handler
  */
app.use(function(err, req, res, next) {
  // log all errors
  console.error(err)

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

module.exports = app;

