
const mongoose = require('mongoose')

//connection string of mongoose
const connectionString = process.env.CONNECTION_STRING

//connect to mongodb using mongoose

mongoose.connect(connectionString).then((res)=>{
    console.log(`mongodb connected successfully`);
}).catch((err)=>{
    console.log(`mongodb connection failed due to :${err}`);
})