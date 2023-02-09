const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const connectDatabase = async() =>{
    return await mongoose.connect(`mongodb+srv://ikea-clone:myIkea@cluster0.luko0xd.mongodb.net/?retryWrites=true&w=majority`)
} 

module.exports = connectDatabase