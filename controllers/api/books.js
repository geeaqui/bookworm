var Book = require('../../models/book');


// INDEX - GET /
function indexBook(req , res) {
  // get the model to load all the posts. wait for data in the callback
  Book.find({} , function(err, books) {
    if(err) res.status(500).json({error: err.message});
    // data return so now we can render
    res.status(200).json(books);
  });
}

// SHOW - GET /:id
function showBook(req , res) {

  Book.findById(req.params.id , function(err, book) {
    // check for errors or for no object found
    if(!book) return res.status(404).send("Not found");
    if(err) res.status(500).json({error: err.message});


    res.status(200).json(book);
  });
}

// DELETE - DELETE /:id
function deleteBook(req , res) {
  // tell the data store to remove the post with the id in the request
  Book.findByIdAndRemove(req.params.id , function(err) {
      if(err) return res.status(500).json({error: err.message});
      // redirect to a GET request
      res.status(204).json({
        message: "Successful deletion"
      });
  });

}

// UPDATE - UPDATE /:id
function updateBook(req , res) {
    // load, bind and save all in one hit
    Book.findByIdAndUpdate(
        req.params.id,
        { $set:  req.body },
        { runValidators: true },
        function(err , book){
          if(err) return res.status(500).json({error: err.message});
          // redirect the user to a GET route. We'll go back to the INDEX.
          res.status(204).json(book);
        }
    );

}


// CREATE - POST /
function createPost(req , res) {
  // ask mongoose to save the data for us and wait for the response
  Post.create( req.body , function(err, post){
    // check for errors and return 500 if there was a problem
    if(err) return res.status(500).json({error: err.message});

    // redirect the user to a GET route. We'll go back to the INDEX.
    res.status(201).json({
      message: "Successfully created",
      post: post
    });
  });
}



// export all our controller functions in an object
module.exports = {

  index:indexPost,
  show: showPost,
  delete: deletePost,
  update: updatePost,
  create: createPost

}