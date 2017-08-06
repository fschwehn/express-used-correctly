const morgan = require('morgan');

module.exports = morgan('dev', { skip: req => /^\/stylesheets/.test(req.originalUrl) })
