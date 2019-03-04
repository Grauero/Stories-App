const indexRoutes = require('../routes/index');
const authRoutes = require('../routes/auth');

module.exports = (app) => {
  app.use('/', indexRoutes);
  app.use('/auth', authRoutes);
};
