const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model('users');
const Story = mongoose.model('stories');

const { ensureAuthenticated } = require('../utils/auth');

router
  .route('/')
  .get(async (req, res) => {
    const stories = await Story.find({ status: 'public' }).populate('user');
    res.render('stories/index', { stories });
  })
  .post(async (req, res) => {
    // check for checkbox value in sended form
    const allowComments = Boolean(req.body.allowComments);
    const newStory = {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      user: req.user.id,
      allowComments
    };

    const createdStory = await new Story(newStory).save();
    res.redirect(`/stories/show/${createdStory.id}`);
  });

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

module.exports = router;
