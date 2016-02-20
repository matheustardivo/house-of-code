module.exports = function(app) {
  var controller = app.controllers.productsController;

  app.get('/products', controller.index);
  app.get('/products/new', controller.new);
  app.post('/products', controller.create);
}
