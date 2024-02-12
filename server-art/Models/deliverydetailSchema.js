const mongoose = require('mongoose')

//create schema
const DeliverySchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobno:{
        type:Number,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    pincode:{
        type:Number,
        require:true
    },
    landmark:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },

})

const deliverydetails = mongoose.model("deliverydetails",DeliverySchema)

module.exports = deliverydetails