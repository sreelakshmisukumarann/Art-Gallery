const mongoose = require('mongoose')

//create schema
const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    },
    place:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true,
    },
    about:{
        type:String,
        require:true,
    },
    phnumber:{
        type:String,
        require:true
    },
    profileImg:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },

})

const profiles = mongoose.model("profiles",profileSchema)

module.exports = profiles