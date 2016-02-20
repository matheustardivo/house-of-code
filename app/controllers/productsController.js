var util = require('util')
  , Product = require('../models/product')();

exports.index = function(request, response, next) {
  var product = new Product();

  product.all(function(err, results) {
    if (err) {
      return next(err);
    }

    response.format({
      html: function() {
        response.render('products/index', { books: results });
      },
      json: function() {
        response.json(results);
      }
    });
  });
};

exports.new = function(request, response) {
  response.render('products/new', { product: {}, errors: [] });
};

exports.create = function(request, response) {
  var productParams = request.body;
  console.log("Product params: ", productParams);

  request.assert('title', 'Title is required').notEmpty();
  request.assert('price', 'Price format is invalid').isFloat();

  var errors = request.validationErrors();
  if (errors) {
    console.log("[DEBUG] Error while trying to create product: " + util.inspect(errors));

    response.statusCode = 412;

    response.format({
      html: function() {
        response.render('products/new', {
          product: productParams,
          errors: errors
        });
      },
      json: function() {
        // response.json({ 'errors': errors });
        response.status(412).json({ 'errors': errors });
      }
    });

    return;
  }

  var product = new Product();
  var createCallback = undefined;

  response.format({
    html: () => {
      createCallback = (err, results) => {
        response.redirect('products');
      };
    },
    json: () => {
      createCallback = (err, results) => {
        response.json(results);
      }
    }
  });

  product.create(productParams, createCallback);
};
