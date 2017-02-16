var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = require('chai').expect;
var Book = require('../models/book');

chai.use(chaiHttp);

describe('Books', function(){
	var book = new Book({
		title: "Harry Potter",
		description: "Half Blood Prince",
		author: "J.K. Rowlings",
		recommendations: 100
	});


	beforeEach(function(){
		book.save(function(err, newBook){
			if(err) return console.log(err);
			console.log("New book has been added :" + newBook.id);
			book.id = newBook.id;
		});
	});

	afterEach(function(){
		Book.findByIdAndRemove(car.id,function(err){
			if(err) return console.log(err);
		});
	});
});