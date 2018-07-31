const express = require( 'express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const { PORT, DB_URI } = require('./config/environment');
const session = require('express-session');
const User = require('./models/user');
const flash = require('express-flash');


const port = 8000;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(DB_URI);


///Models
const Posts = require('./models/post');


///Layouts
const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', `${__dirname}/views`);


///Static files
app.use(express.static(`${__dirname}/public`));


//Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); //adds req.body

app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
})); //COPY & PASTE THIS ALWAYS!!!! (methodOverride)

app.use(session({
  secret: 'grh;ogriowhgrwgrw',
  resave: false,
  saveUninitialized: false
})); // COPY & PASTE THIS ALWAYS!!!! (express-session cookies)

//check the session cookie for a user
app.use((req, res, next) => {
  if (!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .then(user => {
      // we are logged in!
      res.locals.user = user; //res.locals is always passed to the view engine
      res.locals.isLoggedIn = true;

      next();
    });
});

app.use(flash());


//Routers
const router = require('./config/routes');
app.use(router);

//global error handler

app.use((error, req, res, next) => {
  if (error) {
    console.log('Hit the error handler', error);
    req.flash('error', error.message);
    return res.redirect('/');
  }
  return next();

});






//start listening
app.listen(PORT, () => console.log(`up and running on ${port}`));
