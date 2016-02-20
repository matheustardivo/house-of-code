var mysql = require('mysql')
  , util  = require('util');

function ConnectionFactory() {
  this._mysql = mysql;
}

ConnectionFactory.prototype.connect = function() {
  console.log("Connecting to the MySQL...");

  var env = process.env.NODE_ENV || 'development'

  // TODO: (matheustardivo) move this to a config file
  return this._mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: util.format('house_of_code_%s', env)
  });
};

module.exports = function() {
  return ConnectionFactory;
}

// Keeping this commented code bellow just as a example of a different way
// to export your function to be available through CommonJS modules

// exports.connect = function() {
//   console.log("Connecting to the MySQL...");
//
//   return mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'house_of_code'
//   });
// }

// var connect = function() {
//   console.log("Connecting to the MySQL...");
//
//   return mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'house_of_code'
//   });
// }

// module.exports = function() {
//   console.log("express-load calling module.exports");
//   return connect;
// }
