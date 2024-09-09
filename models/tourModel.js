const mongoose = require('mongoose')

const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a price'],
        unique: true,
          trim: true
    },
    durations: {
        type:Number,
        required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size'],
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summery: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Tour', TourSchema)

