const { response } = require('express')
const Products = require('../database/products')
const Cart = require('../database/cart')
const Users = require('../database/user')
const jwt = require('jsonwebtoken')

JWT_SECRET_KEY = '123454321'

function generateToken(user){
    const {_id,name,email} = user
    return jwt.sign({
        _id,name,email
    },JWT_SECRET_KEY)
}

async function getProducts(req,res){
    try{
        let sort = req.query.sort
        let price_range = req.query.price
        let category = req.query.category
        console.log(category)
        // console.log(sort)
        let products
        let sortType
        let Nprice_range = (+price_range + 1)/100
        
        let Lprice_range = (+price_range -5000 +1)/100
        if(price_range==15000){
            Lprice_range = Nprice_range
            Nprice_range = 15000

            console.log(Nprice_range)
        }
        let a = 100
        if(sort) {
            
            if(sort == 'lth') sortType = 1
            else sortType = -1
            products = await  Products.find(price_range!=0?{$and:[{'salesPrice.numeral':{$lt:Nprice_range}},{'salesPrice.numeral':{$gt:Lprice_range}}],typeName:new RegExp(category, "i")}:{typeName:new RegExp(category, "i")}).sort({'salesPrice.numeral':sortType})
            
            return res.send({
                products,
                message: "fetch products successfully"
            })
        }
        products = await Products.find(price_range!=0?{$and:[{'salesPrice.numeral':{$lt:Nprice_range}},{'salesPrice.numeral':{$gt:Lprice_range}}],typeName:new RegExp(category, "i")}:{typeName:new RegExp(category, "i")})
        // products = await Products.find(category!=""?{typeName:new RegExp(category, "i")}:{})
        return res.send({
            products,
            message: "fetch products successfully"
        })
    }

    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function getOneProduct(req,res){
    let id = req.params.id;
    try{
        let product = await Products.findById(id)
        return res.send({
            product,
            message: "fetch one Product Successfully"
        })
    }
    catch(err){
        return res.status(404).send({
            message: err.message
        })
    }
}

async function addToCart(req,res){
    let data = req.body
    // console.log(data)
    try{
        const {name,image,user:{user_id}} = data
        let checkItem = await Cart.findOne({$and:[{name:name,image:image,"user.user_id":user_id}]})
        if(checkItem){
            return res.status(403).send({
                message: "Item already exists"
            })
        }
        let cartItem = await Cart.create(data)
        res.send({
            cartItem,
            message: "item added successfully"
        })
    }
    catch(err){
        return res.status(404).send({
            message: err.message
        })
    }
}

async function signUp(req,res){
    
    try{
        let user = req.body
        let {email} = user
        let existingUser = await Users.findOne({ email: email})
        if(existingUser){
            return res.status(403).send({
                message: "User already exists"
            })
        }
        let addUser = await Users.create(user)
        return res.send({
            message: "sign up successfully",
            addUser
        })
    }
    catch(err){
        return res.status(500).send({message: err.message})
    }
}

async function logIn(req,res){
    try{
        let {email,password} = req.body
        let user = await Users.findOne({email: email})
        if(!user) {
            return res.status(403).send({
                message: "User with this email does not exist"
            })
        }
        if(user.password !== password){
            return res.status(403).send({
                message: 'Wrong password'
            })
        }

        let ikea_user = {
            name: user.firstName,
            email: user.email,
            _id:user._id,
        }
        
        const token =  generateToken(ikea_user)
        const {_id,firstName} = user

        return res.send({
            message : "Login successful",
            data: {
                token,
                user:{
                    _id,
                    firstName
                }
            }
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function checkLoggedIn(req,res){
    try{
        const user = req.user

        return res.send({
            user
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function getCartItems(req,res){
    try{
        let items = await Cart.find({})
        return res.send({
            items
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function updateItem(req,res){
    try{
        let id = req.params.id
        const quantity = req.body
        await Cart.findByIdAndUpdate(id,quantity)
        const items = await Cart.find({})
        return res.send({
            message:"updated",
            items
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

async function deleteItem(req,res){
    try{
        let id = req.params.id
        await Cart.findByIdAndDelete(id)
        const items = await Cart.find({})
        return res.send({
            message:"item deleted successfully",
            items
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {deleteItem,updateItem,getProducts,getCartItems, getOneProduct,addToCart,signUp,logIn,checkLoggedIn}