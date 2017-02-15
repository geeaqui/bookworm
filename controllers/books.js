function indexBooks(req, res){
	res.send('Index');
}

function showBook(req, res){
	res.send('Show');
}

function editBook(req, res){
	res.send('Edit');
}

function newBook(req, res){
	res.send('New');
}

function createBook(req, res){
	res.send('Create');
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