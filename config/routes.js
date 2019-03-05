const indexRoutes = require('../routes/index');
const authRoutes = require('../routes/auth');
const storiesRoutes = require('../routes/stories');

module.exports = (app) => {
  app.use('/', indexRoutes);
  app.use('/auth', authRoutes);
  app.use('/stories', storiesRoutes);
};
