var Book = require('../../models/book');


// INDEX - GET /
function indexPost(req , res) {
  // get the model to load all the posts. wait for data in the callback
  Book.find({} , function(err, books) {
    if(err) res.status(500).json({error: err.message});
    // data return so now we can render
    res.status(200).json(books);
  });
}

// SHOW - GET /:id
function showPost(req , res) {

  Post.findById(req.params.id , function(err, post) {
    // check for errors or for no object found
    if(!post) return res.status(404).send("Not found");
    if(err) res.status(500).json({error: err.message});


    res.status(200).json(post);
  });
}

// DELETE - DELETE /:id
function deletePost(req , res) {
  // tell the data store to remove the post with the id in the request
  Post.findByIdAndRemove(req.params.id , function(err) {
      if(err) return res.status(500).json({error: err.message});
      // redirect to a GET request
      res.status(204).json({
        message: "Successful deletion"
      });
  });

}

// UPDATE - UPDATE /:id
function updatePost(req , res) {
    // load, bind and save all in one hit
    Post.findByIdAndUpdate(
        req.params.id,
        { $set:  req.body },
        { runValidators: true },
        function(err , post){
          if(err) return res.status(500).json({error: err.message});
          // redirect the user to a GET route. We'll go back to the INDEX.
          res.status(204).json(post);
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