var User = require('../models/user');
// NEW ( AKA Registration )
function newUser(req,res) {

  res.render('users/new' , {title:"Register"});

}

// CREATE - Handles registrations
function createUser(req,res){

  // save the user
  var user = new User(req.body);

  user.save(function(err,user){

    // check for errors and return 500 if there was a problem
    if(err) req.flash('error' , err.message);

    // redirect to the posts index page
    res.redirect("/");

  });
}

function showUser(req, res) {
    User.findById(req.user._id).populate("books").exec(function(err, user) {
    // check for errors and return 500 error and message if found
    if(err) return res.status(500).send(err);

    // data return so now we can render
    res.render("users/show" , {
      title: "books",
      books: user.books
    });
  });
}

module.exports = {
  new: newUser,
  create: createUser,
  show: showUser
}