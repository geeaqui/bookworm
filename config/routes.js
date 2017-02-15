var express = require('express');
var routes = express.Router();
var bookController = require('../controllers/books');

router.route("/")
	.get(bookController.index)
	.post(bookController.create);

router.route("/new")
	.post(bookController.create);

router.route("/:id")
	.get(bookController.show)
	.put(bookController.update)
	.delete(bookController.delete);

router.route("/:id/edit")
	.put(bookController.edit);


module.exports = router;