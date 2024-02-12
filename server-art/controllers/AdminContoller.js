//import admin schema
const admins = require('../Models/adminSchema')

//import artworks schema
const artworks = require('../Models/artWorkSchema')

const jwt = require('jsonwebtoken')

//register
exports.adminregister = async(req,res)=>{

    //logic 
    console.log('inside admn register contoller');

    const {username, email, password}=req.body

    try{const existingAdmin = await admins.findOne({email})

    if(existingAdmin){
        res.status(406).json('Account already exists please login')
    }
    else{

        const newAdmin = new admins({
            username,
            email,
            password,
        })
        //save in mongodb
        await newAdmin.save()
        //response
        res.status(200).json(newAdmin)
    }}
    catch(err){
        res.status(401).json('register request faied due to',err)
    }

}

const adminEmail = "admin@gmail.com";
const adminPassword = "admin@123";
//login
exports.adminlogin = async(req,res)=>{
    console.log('inside admin login function');

    const {email,password} = req.body
    // console.log(req.body.role);


    try {
        // Check if provided credentials match the hardcoded admin credentials
        if (email === adminEmail && password === adminPassword) {
          // Generate a token for the authenticated admin
          const token = jwt.sign({ adminId: "admin123" }, "secretAdmin123");
    
          res.status(200).json({ token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } catch (err) {
        console.error('Admin login request failed:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
}

exports.updateArtworkStatus = async(req,res)=>{
    console.log('inside the admin update section');

    try {
        const { artworkId, newStatus } = req.body;
    
        // Update the status in the database
        const updatedArtwork = await artworks.findByIdAndUpdate(
          artworkId,
          { $set: { status: newStatus } },
          { new: true }
        );
    
        res.status(200).json(updatedArtwork);
      } catch (err) {
        console.error('Error updating artwork status:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
}