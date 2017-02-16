var express = require('express');
var app = express();
var layouts = require('express-ejs-layouts');
var port = process.env.PORT || 3000;
var routes = require('./config/routes');
var mongoose = require('mongoose');


//connect to the database
mongoose.connect('mongodb://localhost/books', function(){
	console.log('database has been connected');
})

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