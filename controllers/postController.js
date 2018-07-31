const Post = require('../models/post');

function postsIndex(req, res) {
  Post
    .find()
    .then(posts => {
      res.render('posts/index', {posts});
    });
}

function postsShow(req, res) {

  const postId = req.params.id;
  Post
    .findById(postId)
    .populate('author')
    .then(post => {
      console.log('this is the post ---->', post);
      res.render('posts/show', {post});
    });
}

function postsNew(req, res) {
  res.render('posts/new');
}



function postsCreate(req, res) {
  req.body.author = res.locals.user.id;
  console.log('this is the new record', req.body);
  Post
    .create(req.body)
    .then(() => res.redirect('/posts'))
    .catch(err => res.status(500).send(err));
}

function postsEdit(req, res) {
  Post
    .findById(req.params.id)
    .then(post => res.render('posts/edit', {post}))
    .catch(err => res.status(404).send(err));
}

function postsUpdate(req, res) {
  Post
    .findByIdAndUpdate(req.params.id, req.body)
    .then(post => res.redirect(`/posts/${post.id}`))
    .catch(err => res.status(500).send(err));

}

function postsDelete(req, res) {
  Post
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/posts'))
    .catch(err => res.status(404).send(err));

}






module.exports = {
  index: postsIndex,
  show: postsShow,
  new: postsNew,
  create: postsCreate,
  edit: postsEdit,
  update: postsUpdate,
  delete: postsDelete
};
