// Importing the Movie model
import { Movie } from "../models/movie.js"

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
  // split cast into array of strings
  if (req.body.cast) {
    req.body.cast = req.body.cast.split(", ")
  }
  console.log(req.body)
  console.log(req.body.key)
  for (let key in req.body) {
    // on the first iteration
    // req.body[key] === req.body.title
    // on the second iteration
    /// req.body[key] === req.body.releaseYear
    if (req.body[key] === "") {
      delete req.body[key]
    }
  }
  console.log(req.body)

  //! Two methods of creating movies below!
  //* Creating the movie using the Movie Model
  Movie.create(req.body, function(error, movie){
    if (error) {
      console.log(error)
      return res.redirect("/movies/new")
    }
    res.redirect("/movies")
  })

  //* Creating the movie by instantiating a document using the Movie Model
  // const movie = new Movie(req.body)
  // movie.save(function(err) {
  //   if (err){
  //     console.log(err)
  //     return res.redirect("/movies/new")
  //   } 
  //   res.redirect("/movies/new")
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
  Movie.findById(req.params.id, function(err, movie){
    res.render("movies/show", {
      title: `${movie.title}'s Details`,
      movie,
    })
  })
}

function deleteMovie(req, res) {
  console.log("deleting movie: ", req.params.id)
  Movie.findByIdAndDelete(req.params.id, function(err, movie) {
    res.redirect("/movies")
  })
}

export {
  newMovie as new,
  create,
  index,
  show,
  deleteMovie as delete,
}