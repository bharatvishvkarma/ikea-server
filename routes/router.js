const express = require('express')
const {getProducts,getOneProduct,addToCart,updateItem,signUp,logIn,checkLoggedIn,getCartItems, deleteItem} = require('../controller/controller')
const authMiddleware = require('../middleware/authmiddleware')
const Router = express.Router()

Router.get('/products', getProducts)
Router.get('/products/:id',getOneProduct)
Router.post('/cart',addToCart)
Router.post('/signup',signUp)
Router.post('/login',logIn)
Router.get('/loggedInUser',authMiddleware,checkLoggedIn)

Router.get('/cart',getCartItems)
Router.patch('/cart/:id',updateItem)
Router.delete('/cart/:id',deleteItem)

module.exports = Router