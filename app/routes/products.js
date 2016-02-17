var util = require('util');

module.exports = function(app) {
  app.get('/products', function(request, response) {
    var product = new app.infra.Product();

    product.all(function(err, results) {
      response.format({
        html: function() {
          response.render('products/index', { books: results });
        },
        json: function() {
          response.json(results);
        }
      });
    });
  });

  app.get('/products/new', function(request, response) {
    response.render('products/new', { product: {}, errors: [] });
  });

  app.post('/products', function(request, response) {
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

    var product = new app.infra.Product();

    product.create(productParams, function(err, results) {
      response.redirect('products');
    });
  });
}
