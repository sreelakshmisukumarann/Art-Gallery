require('dotenv').config()

const express = require('express')

const cors = require('cors')

//import router
const router = require('./Routes/router')
//import connect.js
require('./DB/connections')

const artgalleryServer = express()

artgalleryServer.use(cors())

artgalleryServer.use(express.json())

//server use router
artgalleryServer.use(router)

//server use uploads folder
artgalleryServer.use('/uploads',express.static('./uploads'))

//server use profileuplods folder
artgalleryServer.use('/profileuploads',express.static('./profileuploads'))

const PORT = 4000 || process.env.PORT

artgalleryServer.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
})

// // get http
// artgalleryServer.get('/',(req,res)=>{
//     res.send('art-gallery server running succesfully')
// })

// artgalleryServer.put('/',(req,res)=>{
//     res.send('posts')
// })