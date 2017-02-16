var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books');

//books
router.route("/")
	.get(booksController.index)
	.post(booksController.create);

router.route("/new")
	.get(booksController.new);

router.route("/:id")
	.get(booksController.show)
	.put(booksController.update)
	.delete(booksController.delete);

router.route("/:id/edit")
	.get(booksController.edit);


module.exports = router;