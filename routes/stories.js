const router = require('express').Router();
const mongoose = require('mongoose');

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

router
  .route('/:id')
  .put(async (req, res) => {
    // check for checkbox value in sended form
    const allowComments = Boolean(req.body.allowComments);
    const story = await Story.findOne({ _id: req.params.id });

    story.title = req.body.title;
    story.body = req.body.body;
    story.status = req.body.status;
    story.allowComments = allowComments;

    await story.save();
    res.redirect('/dashboard');
  })
  .delete(async (req, res) => {
    await Story.deleteOne({ _id: req.params.id });
    res.redirect('/dashboard');
  });

router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id });
  res.render('stories/edit', { story });
});

router.get('/show/:id', async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id })
    .populate('user')
    .populate('comments.commentUser');
  res.render('stories/show', { story });
});

router.post('/comment/:id', async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id });
  const newComment = {
    commentBody: req.body.commentBody,
    commentUser: req.user.id
  };
  story.comments.unshift(newComment);

  await story.save();
  res.redirect(`/stories/show/${story.id}`);
});

module.exports = router;
