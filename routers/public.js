const router = module.exports = require('express').Router()
    , routerName = 'public'

router.use((req, res, next) => { log(`    >>> request passed ${routerName} router`); next() })

router.get('/redirect', (req, res, next) => {
  log('req.originalUrl: ' + req.originalUrl)
  log('req.baseUrl: ' + req.baseUrl)
  log('req.path: ' + req.path)
  log(`req.route.path: ${req.route.path}`)
  logj(req.route)
  res.redirect('./')
})

router.get('/', (req, res, next) => {
  res.render('generic', { req, router: routerName, pageTitle: 'home' })
})

router.get('/login', (req, res, next) => {
  res.render('generic', { req, router: routerName, pageTitle: 'login' })
})

router.get('/logout', (req, res, next) => {
  res.render('generic', { req, router: routerName, pageTitle: 'logout' })
})
