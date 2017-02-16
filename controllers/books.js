var Book = require('../models/book');

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
		title: "",
		description: "",
		author: "",
		recommendations: ""
	}

	res.render('books/new', {
		title: "New",
		book: newBook
	});
}

function createBook(req, res){
	Book.create(req.body, function(err){
		if(err) return res.status(500).send(err);
		res.redirect('/');
	});
}

function updateBook(req, res){
	Book.findByIdAndUpdate(req.params._id, 
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