import { Performer } from "../models/performer.js"

function newPerformer(req, res) {
  Performer.find({}, function (err, performers){
    res.render("performers/new", {
      title: "Add Performer",
      performers
    })
  })
}

export {
  newPerformer as new
}