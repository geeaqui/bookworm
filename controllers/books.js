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

		res.render('books/:id/edit', {
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
		title: "Edit",
		book: newBook
	});
}

function createBook(req, res){
	Car.create(req.body, function(err, book){
		if(err) return res.status(500).send(err);
		res.redirect('/');
	});
}

function updateBook(req, res){
	res.send('Update');
}

function deleteBook(req, res){
	res.send('Delete');
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