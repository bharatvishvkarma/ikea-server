const express  = require('express');
const cors = require('cors');
const connectDatabase = require('./database/db');
const Router = require('./routes/router')
// const Products = require('./database/products')

const app = express();
app.use(cors())

app.use(express.json())

const port = 4000;

app.use('/',Router)

// Products.find({}).count()
// .then((products)=>{
//     console.log(products)
// })
// .catch((err)=>{
//     console.log(err)
// })

connectDatabase()
.then(()=>{
    app.listen(port,()=>{
        console.log('listening on port ' + port)
    })
})