import {Router} from "express"
import * as performersCtrl from "../controllers/performers.js"

const router = Router()

// localhost:3000/performers/new
router.get("/new", performersCtrl.new)

export {
  router
}