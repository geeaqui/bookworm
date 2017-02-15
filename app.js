var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = require('./config/routes');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/books', function(){
	console.log('database has been connected');
})

//use router
app.use(router);

//connect to the server
app.listen(port, function(){
	console.log("The server is on and is listening on port " + port);
});