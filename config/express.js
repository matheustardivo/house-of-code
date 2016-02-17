var express          = require('express');
var expressValidator = require('express-validator');
var load             = require('express-load');
var bodyParser       = require('body-parser');

module.exports = function() {
  var app = express();

  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressValidator());

  load('infra', { cwd: 'app', verbose: true })
    .then('routes')
    .into(app);

  return app;
}
