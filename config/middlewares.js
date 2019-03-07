const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressHBS = require('express-handlebars');

const { truncate, stripTags, formatDate } = require('../utils/hbs');
const keys = require('./keys');

module.exports = (app, passport) => {
  // handlebars middlewares
  app.engine(
    'handlebars',
    expressHBS({
      helpers: { truncate, stripTags, formatDate },
      defaultLayout: 'main'
    })
  );
  app.set('view engine', 'handlebars');

  // routes middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: keys.secret,
      resave: false,
      saveUninitialized: false
    })
  );

  // auth middlewares
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

  // static assets
  app.use(express.static(path.join(__dirname, '../public')));
};
