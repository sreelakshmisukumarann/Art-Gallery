//import mongoose
const mongoose = require('mongoose')

//create schema
const artWorkSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    copy:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    artImg:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    status:{
        type: String,
        default: 'Pending',
    },
    created_at: {
        type: Date,
        default: Date.now,
      }

})

const artworks = mongoose.model("artworks",artWorkSchema)

module.exports = artworks