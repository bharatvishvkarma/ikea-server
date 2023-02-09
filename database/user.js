const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: String,
    surname: String,
    mobile: String,
    birthDate: String,
    gender: String,
    postCode: String,
    store: String,
    email: String,
    password: String,
})

const Users = mongoose.model('User',userSchema)

module.exports = Users