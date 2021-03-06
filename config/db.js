const mongoose = require('mongoose');

require('../models/User');
require('../models/Story');
const keys = require('./keys');

module.exports = async () => {
  try {
    await mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
  } catch (err) {
    throw new Error('Connection to DB failed');
  }
};
