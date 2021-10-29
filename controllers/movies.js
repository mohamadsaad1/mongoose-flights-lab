// Importing the Movie model
import { Movie } from "../models/movie.js"

// The form to send to a user when they want to make a new movie
function newMovie(req, res) {
  res.render("movies/new")
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

  //! Two methods of creating movies below!
  //* Creating the movie using the Movie Model
  Movie.create(req.body, function(error, movie){
    console.log("The error, if one occured:", error)
    console.log("The moview you just added:", movie)
    res.redirect("/movies")
  })

  //* Creating the movie by instantiating a document using the Movie Model
  // const movie = new Movie(req.body)
  // movie.save(function(err) {
  //   if (err) return res.redirect("/movies/new")
  //   res.redirect("/movies/new")
  // })
}

export {
  newMovie as new,
  create,
}