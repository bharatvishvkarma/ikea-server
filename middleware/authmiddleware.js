const jwt = require('jsonwebtoken')
const Users = require('../database/user')

JWT_SECRET_KEY = '123454321'

async function auth(req,res,next){
    const authorization = req.headers['authorization']

    if(authorization){
        const token = authorization.split(' ').pop()

        if(token){
            try{
                jwt.verify(token,JWT_SECRET_KEY)
            }
            catch(err){
                return res.status(403).send({
                    message: "Invalid token provided"
                })
            }
             let user = jwt.decode(token)
            
             const {firstName, _id} = user
            //  console.log(user)
             req.user = user
             next()
        }
        else{
            return res.status(401).send({
                message: "No auth token present"
            })
        }
    }
    else {
        return res.status(401).send({
            message: 'User is not logged in'
        })
    }
    
}

module.exports = auth