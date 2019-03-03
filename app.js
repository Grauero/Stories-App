/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const auth = require('./routes/auth');
require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.use('/auth', auth);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
