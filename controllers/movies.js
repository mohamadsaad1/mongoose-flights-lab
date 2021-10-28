import { Movie } from "../models/movie.js"

function newMovie(req, res) {
  res.render("movies/new")
}

function create(req, res) {
  // convert nowShowing checkbox to true or false
  req.body.nowShowing = !!req.body.nowShowing
  console.log(req.body)
  if (req.body.cast) {
    req.body.cast = req.body.cast.split(", ")
  }
  console.log(req.body)

  const movie = new Movie(req.body)
  movie.save(function(err) {
    if (err) return res.redirect("/movies/new")
    res.redirect("/movies/new")
  })
}

export {
  newMovie as new,
  create,
}