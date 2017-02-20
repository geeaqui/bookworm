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
var flash = require('connect-flash');
var path = require('path');
var User = require('./models/user');

//connect to the database
mongoose.connect('mongodb://localhost/books', function(){
  console.log('database has been connected');
})

//use public folder to insert external files into the wesite page
app.use(express.static(path.join(__dirname, 'public')))

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

app.use(flash());

// middleware to make flash messages available in every template
app.use(function(req, res, next){
    // res.locals will be available in every template
    res.locals.errors = req.flash('error');
    console.log(res.locals.errors);
    next();
});

// body parser for form data
app.use(bodyParser.urlencoded({ extended: false }));

//method override
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

//check for login on all routes except sessions
app.use(function(req, res, next) {
  console.log(req.url)
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