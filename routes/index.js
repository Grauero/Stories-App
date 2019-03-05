const router = require('express').Router();

const { ensureAuthenticated, ensureGurest } = require('../utils/auth');

router.get('/', ensureGurest, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('index/dashboard');
});

router.get('/about', (req, res) => {
  res.render('index/about');
});

module.exports = router;
