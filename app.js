/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

require('./models/User');
require('./config/passport')(passport);
const auth = require('./routes/auth');
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;

(async function connectToDB() {
  try {
    await mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
  } catch (err) {
    throw new Error('Connection to DB failed');
  }
}());

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.use(cookieParser());
app.use(
  session({
    secret: keys.secret,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
app.use('/auth', auth);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
