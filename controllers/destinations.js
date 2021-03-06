import { Destination } from '../models/destination.js'

function newDestination(req, res) {
  Destination.find({}, function (err, destinations) {
    res.render('destinations/new', {
      destinations
    })
  })
}

function create(req, res) {
  Destination.create(req.body, function (err, destination) {
    res.redirect('/destinations/new')
  })
}

export {
  create,
  newDestination as new,
}