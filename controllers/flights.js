import {Destination} from '../models/destination.js'
import {Flight} from '../models/flight.js'

// 
function newFlight(req, res) {
  res.render('flights/new')
}
// 

function index(req, res) {
  
  Flight.find({}).sort({departs: 'asc'}).exec(function(err, flights) {
    if (err) return res.render('flights/index', flights)
      res.render('flights/index', {flights})
  })
}
///

///
function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
  if (req.body.departs === null) {
    const zz = newFlight.departs;
    const newFlight = new Flight();
    //MDN - The toISOString() method returns a string in simplified extended ISO format (ISO 8601), which is always 24 or 27 characters long (YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ, respectively). The timezone is always zero UTC offset, as denoted by the suffix "Z".//
    const departsDate = zz.toISOString().slice(0, 16);
  res.render('flights/new', {departsDate});
    req.body.departs = newFlight.departs
  }
  Flight.create(req.body, function(err, flight){
    if (err) {
      return res.redirect('/flights/new)')
    }  return res.redirect(`/flights/${flight._id}`)
  })
}
///
function show(req,res) {
  Flight.findById(req.params.id)
  .populate("destinations")
  .exec(function(err, flight) {
    Destination.find({_id: {$nin: flight.destinations}}, function(err, destinationsNotInList){
        res.render('flights/show',{
          flight,
          destinationsNotInList
        })
      })
  })
}
//
function addTicket(req,res){
  Flight.findById(req.params.id,
    function(err,flight){
      flight.tickets.push(req.body)
      flight.save(function(err){
        res.redirect(`/flights/${flight._id}`)
      
    })
})
}
//
function addToFlight(req,res){
  Flight.findById(req.params.id, function(err,flight){
    flight.destinations.push(req.body.destinationId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}
//

function deleteTicket(req,res){
  Flight.findById(req.params.flightId, function(err, flight){
    flight.tickets.remove({_id:req.params.ticketId})
    flight.save(function(err, flight) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}
//

function deleteDestination(req,res){
  Flight.findById(req.params.flightId, function(err, flight){
    flight.destinations.remove({_id:req.params.destinationId})
    flight.save(function(err, flight) {
    })
  })
}


//
function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.id, function(err, flight){
    res.redirect("/flights")
  })
}
//





export {
  index,
  create,
  show,
  addTicket,
  addToFlight,
  newFlight as new,
  deleteFlight as delete,
  deleteDestination,
  deleteTicket,
}