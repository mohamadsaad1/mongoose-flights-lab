// Importing the Movie model
import { Movie } from "../models/movie.js"
// Importing the Performer model
import { Performer } from "../models/performer.js"

// The form to send to a user when they want to make a new movie
function newMovie(req, res) {
  res.render("movies/new", {
    title: "Add Movie",
  })
}

//
function create(req, res) {
  // convert nowShowing checkbox to true or false
  req.body.nowShowing = !!req.body.nowShowing
  console.log(req.body)
  for (let key in req.body) {
    // on the first iteration
    // req.body[key] === req.body.title
    // on the second iteration
    /// req.body[key] === req.body.releaseYear
    if (req.body[key] === "") {
      delete req.body[key]
    }
  }

  //! Two methods of creating movies below!
  //* Creating the movie using the Movie Model
  Movie.create(req.body, function(error, movie){
    if (error) {
      console.log(error)
      return res.redirect("/movies/new")
    }
    res.redirect(`/movies/${movie._id}`)
  })

  //* Creating the movie by instantiating a document using the Movie Model
  // const movie = new Movie(req.body)
  // movie.save(function(err) {
  //   if (err){
  //     console.log(err)
  //     return res.redirect("/movies/new")
  //   } 
  //   res.redirect(`/movies/${movie._id}`)
  // })
}

function index(req, res) {
  Movie.find({}, function(error, movies) {
    res.render("movies/index", {
      movies,
      error,
      title: "All Movies"
    })
  })
}

function show(req, res) {
  Movie.findById(req.params.id)
  .populate("cast")
  .exec(function(err,movie){
    console.log(movie.cast)
    Performer.find({_id: {$nin: movie.cast}}, function(err, performersNotInCast){
      console.log(performersNotInCast)
      let total = 0
      movie.reviews.forEach(function(review){
        total += review.rating
      })
      let averageReviewScore = (total / movie.reviews.length).toFixed(1)
      res.render("movies/show", {
        title: `${movie.title}'s Details`,
        averageReviewScore,
        movie,
        performersNotInCast
      })
    })
  })
}

function deleteMovie(req, res) {
  console.log("deleting movie: ", req.params.id)
  Movie.findByIdAndDelete(req.params.id, function(err, movie) {
    console.log(movie)
    res.redirect("/movies")
  })
}

function edit(req, res) {
  console.log("editing movie:", req.params.id)
  Movie.findById(req.params.id, function(error, movie) {
    console.log(movie)
    res.render("movies/edit", {
      title: "Edit a movie!",
      movie,
    })
  })
}

function update(req, res) {
  console.log("remaking a movie:", req.params.id)
  req.body.nowShowing = !!req.body.nowShowing

  for (let key in req.body) {
    // on the first iteration
    // req.body[key] === req.body.title
    // on the second iteration
    /// req.body[key] === req.body.releaseYear
    if (req.body[key] === "") {
      delete req.body[key]
    }
  }
  Movie.findByIdAndUpdate(req.params.id, req.body, function(err, movie) {
    res.redirect(`/movies/${movie._id}`)
  })
}

function createReview(req, res) {
  Movie.findById(req.params.id, function(error, movie) {
    movie.reviews.push(req.body)
    console.log(movie)
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`)
    })
  })
}

function addToCast(req, res) {
  Movie.findById(req.params.id, function(err, movie){
    movie.cast.push(req.body.performerId)
    movie.save(function(err){
      res.redirect(`/movies/${movie._id}`)
    })
  })
}

export {
  newMovie as new,
  create,
  index,
  show,
  deleteMovie as delete,
  edit,
  update,
  createReview,
  addToCast
}