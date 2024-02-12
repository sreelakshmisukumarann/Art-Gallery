//import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');
    //logic
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try{
        const jwtResponse = jwt.verify(token,"superkeylakshmi123")
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    } catch(err){
        res.status(401).json("Authurization failed..please login")
    }
    
}

module.exports = jwtMiddleware