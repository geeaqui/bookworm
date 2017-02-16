var express = require('express');
var app = express();
var layouts = require('express-ejs-layouts');
var port = process.env.PORT || 3000;
var routes = require('./config/routes');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// add support for cookies
app.use(cookieParser());

// add support for sessions
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'youR3elyL1k3B0Oks'
}));

// load logged in user
app.use(function(req,res,next) {

  // no user id? just move on
  if(!req.session.user) {
       res.locals.user = false;
      next();
  } else {

    // load the user with the ID in the session
    User.findById(req.session.user , function(err, user){

      if(user) {
        // add the user to the request object
        req.user = user;
        // add it to locals so we can use it in all templates
        res.locals.user = user;
      } else {
        // couldn't find it... that's weird. clear the session
        req.session.user = null;
      }

      next(err);

    });

  }

});

//connect to the database
mongoose.connect('mongodb://localhost/books', function(){
	console.log('database has been connected');
})
// body parser for form data
app.use(bodyParser.urlencoded({ extended: false }));

// method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// tell express to use ejs for rendering templates
app.set('view engine' , 'ejs');

// use express layouts middleware too
app.use(layouts);

// check for login on all routes except sessions
app.use(function(req, res, next) {
  var urls = ["/sessions/new", "/users/new", "/sessions", "/users"];
  if(urls.indexOf(req.url) === -1) {
    if (!req.user) return res.redirect('/sessions/new');
  }
  next();
});

//use router
app.use(routes);

//connect to the server
app.listen(port, function(){
	console.log("The server is on and is listening on port " + port);
});

module.exports = app;