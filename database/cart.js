const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    image: String,
    name: String,
    price:Number,
    quantity: Number,
    measurement: String,
    details: String,
    user:
        {
        user_id: String,
        user_name: String,
    },
})

const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart