process.env.LOGGER = 'none'

const request = require('supertest')
    , app = require('../app')
    , log = console.log
    , logj = x => console.log(JSON.stringify(x, null, '  '))

describe('GET /', () => {
  it('should return 200', (done) => {
    request(app).get('/').expect(200, done)
  })
})

describe('GET /blog', () => {
  it('should return 200', (done) => {
    request(app).get('/blog').expect(200, done)
  })
})

describe('POST /blog', () => {
  it('should redirect to /blog', (done) => {
    request(app).post('/blog')
      .expect('Location', '/blog')
      .expect(302, done)
  })
})
