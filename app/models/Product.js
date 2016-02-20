var ConnectionFactory = require('../infra/ConnectionFactory')();

function Product() {
  this._connectionFactory = new ConnectionFactory();
}

Product.prototype.all = function(callback) {
  console.log("[DEBUG]: calling Product.all");

  var connection = this._connectionFactory.connect();

  connection.query('select * from books', callback);
  connection.end();
};

Product.prototype.create = function(params, callback) {
  console.log("[DEBUG]: calling Product.create for: ", params);

  var connection = this._connectionFactory.connect();

  connection.query('insert into books set ?', params, callback);
  connection.end();
}

module.exports = function() {
  return Product;
}
