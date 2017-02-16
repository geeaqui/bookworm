var express = require('express');
var app = express();
var layouts = require('express-ejs-layouts');
var port = process.env.PORT || 3000;
var routes = require('./config/routes');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');


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

//use router
app.use(routes);

//connect to the server
app.listen(port, function(){
	console.log("The server is on and is listening on port " + port);
});

module.exports = app;