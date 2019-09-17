const request = require('supertest')
const app = require('../app')

describe('Test the root path', () => {
  beforeAll(() => {})
  test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  test('It should response the message', (done) => {
    request(app).get('/').then((response) => {
      let resp = JSON.parse(response.text)
      expect(resp).toHaveProperty('routes')
      done()
    })
  })
})

describe('Test the /db path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/db').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  test('It should response with the data', (done) => {
    request(app).get('/db').then((response) => {
      let resp = JSON.parse(response.text)
      expect(resp).toHaveProperty('data')
      done()
    })
  })
})

describe('Test the /parse/:asin path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/parse/B00D89VK3Q').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  test('It should response ', (done) => {
    request(app).get('/parse/unknown').then((response) => {
      let resp = JSON.parse(response.text)
      expect(resp).toHaveProperty('error', true)
      done()
    })
  })

  test('It should response with the data', (done) => {
    request(app).get('/parse/B00D89VK3Q').then((response) => {
      let resp = JSON.parse(response.text)
      expect(resp).toHaveProperty('data')
      done()
    })
  })
})