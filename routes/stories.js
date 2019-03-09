const router = require('express').Router();
const mongoose = require('mongoose');

const Story = mongoose.model('stories');
const { ensureAuthenticated } = require('../utils/auth');

router
  .route('/')
  .get(async (req, res) => {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ date: 'desc' });

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

router.get('/my', ensureAuthenticated, async (req, res) => {
  const stories = await Story.find({ user: req.user.id }).populate('user');
  res.render('stories/index', { stories });
});

router.get('/user/:userId', async (req, res) => {
  const stories = await Story.find({
    user: req.params.userId,
    status: 'public'
  }).populate('user');

  res.render('stories/index', { stories });
});

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id });
  if (story.user == req.user.id) {
    return res.render('stories/edit', { story });
  }

  return res.redirect('/stories');
});

router.get('/show/:id', async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id })
    .populate('user')
    .populate('comments.commentUser');

  // show PRIVATE story ONLY if user is creator of this story and he is authenticated
  if (story.status === 'public') return res.render('stories/show', { story });
  if (!req.user) return res.redirect('/stories');
  if (req.user.id == story.user._id) return res.render('stories/show', { story });

  res.redirect('/stories');
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
