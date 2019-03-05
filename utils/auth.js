module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');
  },
  ensureGurest: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    }

    return next();
  }
};
