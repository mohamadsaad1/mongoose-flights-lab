import {Router} from "express"
import * as performersCtrl from "../controllers/performers.js"

const router = Router()

// localhost:3000/performers/new - GET
router.get("/new", performersCtrl.new)
// localhost:3000/performers - POST
router.post("/", performersCtrl.create)

export {
  router
}