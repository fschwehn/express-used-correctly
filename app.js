global.log = console.log
global.logj = x => console.log(JSON.stringify(x, null, '    '))

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

/**
 * set locals
 *
 * app.locals will be inherited by each req.locals
 */
app.locals.title = 'routers'

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
app.use(logger('dev', { skip: req => /^\/stylesheets/.test(req.originalUrl) }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./routers/public'))
// app.use(require('./routers/staff'))
// app.use('/admin', require('./routers/admin'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
