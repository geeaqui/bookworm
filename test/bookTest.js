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


	beforeEach(function(done){
		book.save(function(err, newBook){
			if(err) return console.log(err);
			console.log("New book has been added :" + newBook.id);
			book.id = newBook.id;
			done();
		});
	});

	afterEach(function(done){
		Book.findByIdAndRemove(book._id,function(err){
			if(err) return console.log(err);
			done();
		});
	});


	it('should list a SINGLE book on /<id> GET', function(done) {
	    chai.request(app)
	      .get('/' + book.id)
	      .end(function(err, res){
	      	console.log(book);
	        res.should.have.status(200);
	        res.should.be.html;
	        //res.text.should.match(/Library 1/);
	        done();
	      });
	  });

	it('should list ALL books on / GET', function(done) {
	    var request = chai.request(app);
	    request
	      .get('/')
	      .end(function(err, res){
	        res.should.have.status(200);
	        res.should.be.html;
	        //res.text.should.match(/Book/);
	        //res.text.should.match(/Harry Potter/);
	        done();
	     });
	 });


	  it('should add a SINGLE book on / POST' , function(done){
	    var request = chai.request(app);
	    request.post('/new')
	      .set('content-type', 'application/x-www-form-urlencoded')
	      .send({
	      	_id: 123,
	        title: "The Lord of the Rings",
	        descritpion: "The Return of the King",
	        author: "R. R. Tolkien",
	        recommendations: 199
	      })
	      .end(function(err, res){
	        res.should.have.status(200);
	        res.should.be.html;
	        res.text.should.match(/All books/);
	        request
	          .get('/123')
	          .end(function(err, res){
	            res.should.have.status(200);
	            res.should.be.html;
	            res.text.should.match(/The Lord of the Rings/);
	            res.text.should.match(/The Return of the King/);
	
	            Book.findByIdAndRemove(123, function(err) {
	              if (err) return console.log(err);
	              done();
	            });
	          });
	      });
	  });

	  // describe a test for PUT
	  it('should update a SINGLE book on /<id> PUT' , function(done){
	    var request = chai.request(app);
	    request.put('/' + book._id)
	      .set('content-type', 'application/x-www-form-urlencoded')
	      .send({'title': 'War and Peace', 'author':  'Leo Tolstoy'})
	      .end(function(err, res){
	        res.should.have.status(200);
	        res.should.be.html;
	        res.text.should.match(/Books/);
	        request
	          .get('/' + book._id)
	          .end(function(err, res){
	            res.should.have.status(200);
	            res.should.be.html;
	            res.text.should.match(/War/);
	            res.text.should.match(/Peace/);
	            done();
	          });
	      });
	  });

	   it('should delete a SINGLE book on /<id> DELETE' , function(done) {
	    var request = chai.request(app);
	    request.delete('/' + book.id)
	      .end(function(err, res){
	        res.should.have.status(200);
	        res.should.be.html;
	        res.text.should.match(/Books/);
	        request
	          .get('/' + book.id)
	          .end(function(err, res){
	            res.should.have.status(404);
	            done();
	          });
	      });
	  });
});





































