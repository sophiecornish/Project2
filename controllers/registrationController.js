const User = require('../models/user');

function registrationsNew(req, res) {
  res.render('registrations/new');
}

function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then(user => {
      console.log('we have created a user', user);
      res.redirect('/');
    })
    .catch(err => res.status(500).redirect('/registrations/new'));

}


module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
