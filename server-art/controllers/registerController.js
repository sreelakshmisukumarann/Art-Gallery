//import model
const users = require('../Models/userSchema')

//import jwt
const jwt = require('jsonwebtoken')

//logic for register
exports.register = async(req,res)=>{

    //logic 
    console.log('inside register contoller');

    const {username, email, password, role}=req.body

    try{const existingUser = await users.findOne({email})

    if(existingUser){
        res.status(406).json('Account already exists please login')
    }
    else{

        const newUser = new users({
            username,
            email,
            password,
            role
        })
        //save in mongodb
        await newUser.save()
        //response
        res.status(200).json(newUser)
    }}
    catch(err){
        res.status(401).json('register request faied due to',err)
    }

}

//logic for login
exports.login = async(req,res)=>{
    console.log('inside login function');

    const {email,password} = req.body
    // console.log(req.body.role);


    try{const existingUser = await users.findOne({email,password})

    if(existingUser){
        const token = jwt.sign({userId: existingUser._id},"superkeylakshmi123")
        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(406).json('invalid emailId or password')
    }
}catch(err){
    res.status(401).json('login request failed due to :',err)
}
}