const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}

});

userSchema.methods.validatePassword = function(password) {
  //check the password from the form (plaintext) against the hash in the DB
  return bcrypt.compareSync(password, this.password);
};


userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    // can't set the passwordConfirmation inside the function which says what to do when the password confirmation is set

    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function(next) {
  //'this' is the model
  console.log('pre-validate hook has happened');
  if(this._passwordConfirmation !== this.password) {
    console.log('Passwords did not match');
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next(); // we've finished thanks. Mongoose can do the next thing in the lifecycle

});

userSchema.post('validate', function() {
  //'this' is the model
  console.log('post-validate hook has happened');
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

module.exports = mongoose.model('User', userSchema);
