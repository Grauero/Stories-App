const router = require('express').Router();

const { ensureAuthenticated } = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('stories/index');
});

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

module.exports = router;
