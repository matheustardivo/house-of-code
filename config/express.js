var express          = require('express')
  , expressValidator = require('express-validator')
  , load             = require('express-load')
  , bodyParser       = require('body-parser');

module.exports = function() {
  var app = express();

  app.use(express.static('./app/public'));

  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressValidator());

  load('infra', { cwd: 'app', verbose: true })
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app);

  app.use(function(req, res, next) {
    res.status(404).render('errors/404');
    next();
  });

  app.use(function(error, req, res, next) {
    if (process.env.NODE_ENV == 'production') {
      res.status(500).render('errors/500');
      return;
    }
    next(error);
  });

  return app;
}
