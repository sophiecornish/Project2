const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const registrationController = require('../controllers/registrationController');
const sessionController = require('../controllers/sessionController');
const commentController = require('../controllers/commentController');


const Post = require('../models/post');

//----------------- SECURE ROUTE FUNCTION ----------------//

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'Please login to view this page');
      res.redirect('./sessions/new');
    });
  }
  return next();
}


//---------- RENDERING PAGES -----------------//

router.get('/', (req, res) => res.render('pages/_home'));
router.get('/about', (req, res) => res.render('pages/_about'));


//--------------REGISTRATION ROUTES -----------------//
router.route('/registrations/new')
  .get(registrationController.new);
router.route('/registrations')
  .post(registrationController.create);


//----------- SESSIONS ROUTES ---------------------//

router.route('/sessions/new')
  .get(sessionController.new);
router.route('/sessions')
  .post(sessionController.create);
router.route('/sessions/delete')
  .get(sessionController.delete);




//----------------- INDEX/POSTS ROUTES--------------------//
router.route('/posts')
  .get(postController.index)
  .post(postController.create);


//-------------------NEW POST ROUTES--------------------------//

router.route('/posts/new')
  .get(secureRoute, postController.new);

router.get('/posts/:id/edit', postController.edit);

router.route('/posts/:id')
  .put(postController.update)
  .get(postController.show)
  .delete((req, res, next) => {
    if (req.session.isLoggedIn) {
      postController.delete();
    } else {
      res.redirect('/sessions/new', {message: 'You cannot do that! Please login'});
    }
    return next();
  });


//----------------- COMMENT ROUTES --------------------//

router.route('/posts/:postId/comments')
  .post(secureRoute, commentController.create);

router.route('/posts/:postId/comments/:commentId')
  .delete(secureRoute, commentController.delete);




module.exports = router;
