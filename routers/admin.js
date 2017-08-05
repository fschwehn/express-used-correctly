const router = module.exports = require('express').Router()
    , routerName = 'admin'

router.use((req, res, next) => { log(`    >>> request passed ${routerName} router`); next() })

router.get('/users', (req, res, next) => {
  res.render('generic', { req, router: routerName, pageTitle: 'users' })
})

router.get('/groups', (req, res, next) => {
  res.render('generic', { req, router: routerName, pageTitle: 'groups' })
})
