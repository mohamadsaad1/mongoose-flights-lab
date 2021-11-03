import mongoose from 'mongoose'

const Schema = mongoose.Schema 

const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/},
  price: {type: Number, min: 0}
})

const flightSchema = new Schema({
  airline: {
    type:String,
    enum: ['Southwest','American', 'United']
  },
  airport: {
    type:String,
    enum: ['LAX','AUS','DEN','DFW','SAN'],
    default: 'LAX',
  },

  
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },


  departs:{
    type:Date,
    default: function() {
    const date = new Date()
    const yearFromNow = date.getFullYear()+1
    date.setFullYear(yearFromNow)
    return date
  }},
  tickets: [ticketSchema],
  destinations: [{type: Schema.Types.ObjectId, ref: "Destination"}]
},
  {
    timestamp: true,   
  })

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
} 