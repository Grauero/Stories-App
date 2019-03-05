const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressHBS = require('express-handlebars');

const keys = require('./keys');

module.exports = (app, passport) => {
  // handlebars middlewares
  app.engine('handlebars', expressHBS({ defaultLayout: 'main' }));
  app.set('view engine', 'handlebars');

  // routes middlewares
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
