var mysql = require('mysql');

function ConnectionFactory() {
  this._mysql = mysql;
}

ConnectionFactory.prototype.connect = function() {
  console.log("Connecting to the MySQL...");

  return this._mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'house_of_code'
  });
};

module.exports = function() {
  return ConnectionFactory;
}

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
//
// module.exports = function() {
//   console.log("express-load calling module.exports");
//   return connect;
// }
