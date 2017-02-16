// NEW - GET /new
function newUser(req , res) {

  // create an empty user
  var newUser = {
    id: "",
    title: "",
    body: ""
  }

  res.render("posts/new" , {
    title: "Register",
    user: newUser
  });
}

// CREATE - POST /
function createUser(req , res) {

  // data is gathered by body parser and placed in req.body

  // ask mongoose to save the data for us and wait for the response
  User.create( req.body , function(err, post){
  
    // check for errors and return 500 if there was a problem
    if(err) req.flash('error' , err.message);
  
    // redirect the user to a GET route. We'll go back to the INDEX.
   res.redirect("/");
  
  });
}

// export all our controller functions in an object
module.exports = {

  new: newUser,
  create: createUser

}