var Book = require('../models/book');
var User = require('../models/user');

function indexBooks(req, res){
	Book.find({}, function(err, books){
		if(err) return res.status(500).send(err);
		res.render('books/index', {
			title: "Books",
			book: books
		});
	});
}

function showBook(req, res){
	Book.findById(req.params.id,function(err, book){
		if(!book) return res.status(404).send('Book not found');
		if(err) return res.status(500).send(err);
		res.render('books/show', {
			title: "Books",
			book: book
		});
	})
}

function editBook(req, res){
	Book.findById(req.params.id, function(err, book){
		if(!book) return res.status(404).send('Book not Found!');
		if(err) return res.status(500).send(err);

		res.render('books/edit', {
			title: "Edit Book",
			book: book
		});
	});
}

function newBook(req, res){
	var newBook = {
		id :"",
		title: "",
		description: "",
		author: ""
	}

	res.render('books/new', {
		title: "New",
		book: newBook
	});
}

function createBook(req, res){
	// Book.create(req.body, function(err){
	// 	if(err) return req.flash('error' , err.message);
	// 	res.redirect('/');
	// });

	// ask mongoose to save the data for us and wait for the response
  	Book.create( req.body , function(err, book){
    // check for errors and return 500 if there was a problem
    if(err) req.flash('error' , err.message);
    User.findByIdAndUpdate(
      req.user._id,
      { $addToSet : { books: book}},
      function(err, user) {
        // check for errors and return 500 if there was a problem
        if(err) req.flash('error' , err.message);
        // redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect("/");
      }
    )
  });

}

function updateBook(req, res){
	Book.findByIdAndUpdate(req.params.id, 
		{$set: req.body},
		{runValidator: true},
		function(err, car){
			if(err) return res.status(500).send(err);
			res.redirect('/');
		});
}

function deleteBook(req, res){
	Book.findByIdAndRemove(req.params.id, function(err){
		if(err) return res.status(500).send(err);
		res.redirect('/');
	});
}


module.exports = {
	index: indexBooks,
	show: showBook,
	edit: editBook,
	new: newBook,
	create: createBook,
	update: updateBook,
	delete: deleteBook
}