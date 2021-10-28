import { Router } from 'express'
import * as moviesCtrl from "../controllers/movies.js"
const router = Router()

/* GET movies listing. */

// localhost:3000/movies/new - GET
router.get("/new", moviesCtrl.new)
// localhost:3000/movies - POST
router.post("/", moviesCtrl.create)

export {
  router
}
