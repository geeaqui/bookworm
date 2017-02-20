var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books');
var usersController = require('../controllers/users');
var sessionsController = require('../controllers/sessions');

//users
router.route('/users')
		.post(usersController.create);

router.route('/users/new')
		.get(usersController.new);

router.route('/users/show')
		.get(usersController.show);


//sessions

router.route('/sessions')
      .post(sessionsController.create)
      .delete(sessionsController.delete);

router.route('/sessions/new')
      .get(sessionsController.new);
      

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