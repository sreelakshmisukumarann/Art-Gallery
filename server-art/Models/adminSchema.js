const mongoose = require('mongoose')

const validator = require('validator')

//create admin schema
const adminSchema = new mongoose.Schema({
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
    }
})

const admins = mongoose.model("admins",adminSchema)

module.exports = admins
