import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

/* GET users listing. */
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)

// post
// localhost:3000/flights/:id/.... - POST
router.post('/', flightsCtrl.create)
router.post('/:id/tickets', flightsCtrl.addTicket)

// delete
// localhost:3000/flights/:id/.... - DELETE
router.delete('/:id', flightsCtrl.delete)
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)
router.delete('/:flightId/destinations/:destinationId', flightsCtrl.deleteDestination)
router.post('/:id/destinations', flightsCtrl.addToFlight)

export {
  router
}