const mongoose = require('mongoose')

const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a price'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price:{
        type: Number,
        required: [true, 'A tour must have a price']
    }
})

module.exports = mongoose.model('Tour', TourSchema)

