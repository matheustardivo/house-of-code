var express = require('../config/express')()
  , request = require('supertest')(express);

describe('ProductsController', () => {

  beforeEach((done) => {
    // Use https://github.com/emerleite/node-database-cleaner instead
    var connectionFactory = new express.infra.ConnectionFactory();
    var connection = connectionFactory.connect();
    connection.query("delete from books", (err, result) => {
      if (!err) {
        done();
      }
    });
    connection.end();
  });

  it('#product.all', (done) => {
    request.get('/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('#product.create with an invalid product data', (done) => {
    request.post('/products')
      .send({
        title: '',
        description: 'Product description'
      })
      .expect(412, done);
  });

  it('#product.create with json should return OK', (done) => {
    request.post('/products')
      .set('Accept', 'application/json')
      .send({
        title: 'Product title',
        description: 'Product description',
        price: 1.99
      })
      .expect(200, done);
  });

  it('#product.create should return a redirect', (done) => {
    request.post('/products')
      .send({
        title: 'Product title',
        description: 'Product description',
        price: 1.99
      })
      .expect(302, done);
  });

});
