const app = require('../server');
const testServer = require('supertest');

describe('testing /blog', () => {
  test('it should protect the post route in /blog', () => {
    testServer(app).get('/api/blog/post')
      .then((response) => {
        expect(response.statusCode).toBe(403)
      })
  })

  test('it should protect the delete route in /blog', () => {
    testServer(app).get('/api/blog/:id')
      .then((response) => {
        expect(response.statusCode).toBe(403)
      })
  })
})