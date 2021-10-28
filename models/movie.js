import mongoose from "mongoose"

const Schema = mongoose.Schema

const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  cast: [String],
  nowShowing: Boolean,
})

const Movie = mongoose.model("Movie", movieSchema)

export {
  Movie
}

// const todoSchema = new Schema({
//   text: String,
//   done: Boolean
// })