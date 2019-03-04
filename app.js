const express = require('express');
const passport = require('passport');

const setupDB = require('./config/db');
const setupMiddlewares = require('./config/middlewares');
const setupPassport = require('./config/passport');
const setupRoutes = require('./config/routes');

const app = express();
const PORT = process.env.PORT || 5000;

setupDB();
setupMiddlewares(app, passport);
setupPassport(passport);
setupRoutes(app);

app.listen(PORT);
