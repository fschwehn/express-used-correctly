const router = module.exports = require('express').Router()
    , routerName = 'staff'

router.use((req, res, next) => { log(`    >>> request passed ${routerName} router`); next() })

router.get('/members', (req, res, next) => {
  res.render('generic', { req, router: routerName, pageTitle: 'members' })
})

router.get('/products', (req, res, next) => {
  res.render('generic', { req, router: routerName, pageTitle: 'products' })
})
