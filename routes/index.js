const router = require('express').Router();
const mongoose = require('mongoose');

const Story = mongoose.model('stories');
const { ensureAuthenticated, ensureGuest } = require('../utils/auth');

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  const stories = await Story.find({ user: req.user.id });
  res.render('index/dashboard', { stories });
});

router.get('/about', (req, res) => {
  res.render('index/about');
});

module.exports = router;
