import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

/* GET users listing. */
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)

// post
router.post('/', flightsCtrl.create)
router.post('/:id/tickets', flightsCtrl.addTicket)
router.post('/:id/destinations', flightsCtrl.addToFlight)

// delete
router.delete('/:id', flightsCtrl.delete)
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)
router.delete('/:flightId/destinations/:destinationId', flightsCtrl.deleteDestination)

export {
  router
}








// localhost:3000/movies/:id/performers - POST


// localhost:3000/movies/:id - DELETE


// localhost:3000/movies/:id - PUT

