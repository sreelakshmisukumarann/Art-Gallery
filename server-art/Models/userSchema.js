const mongoose = require('mongoose')
//import validator
const validator = require('validator')

//crreate schema - use chechama
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:['3','must be atleast 3 charactor, got only {value}',]

    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    }

})

//create model
const users = mongoose.model("users",userSchema)

//export 
module.exports = users