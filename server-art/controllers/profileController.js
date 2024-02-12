// import schemas
const profiles = require('../Models/profileSchema');
const users = require('../Models/userSchema');
const artworks = require('../Models/artWorkSchema');

// logic
exports.addProfile = async (req, res) => {
    console.log('inside the addProfile request');

    try {
        const userId = req.payload;

        const user = await users.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        } else {
            const profileImg = req.file.filename;
            const { place, country, phnumber, about } = req.body;

            console.log(`${place}, ${country}, ${phnumber}, ${about}, ${profileImg}`);

            // Access username and role from the user object
            const newProfile = new profiles({
                userId,
                name: user.username,  // Corrected to use user.username
                role: user.role,      // Corrected to use user.role
                place,
                country,
                phnumber,
                about,
                profileImg,
            });

            await newProfile.save();
            
            res.status(200).json({ success: true, message: 'Profile added successfully', data: newProfile });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: `Failed due to error: ${err}` });
    }
};

//get all profile info
exports.getAllProfile = async(req,res)=>{
    try{
      const allProfile = await profiles.find()
      res.status(200).json(allProfile)
    } catch (err){
      res.status(401).json(`Request failed due to ${err}`)
    }
  }

//get one profile info
exports.getprofile = async(req,res)=>{
     userId = req.payload
    try{
      const oneProfile = await profiles.find({userId})
      res.status(200).json(oneProfile)
    } catch(err){
      res.status(401).json(`Request failed due to ${err}`)
    }
  } 
  
// get one profile info by ID
exports.getprofileById = async (req, res) => {
    const profileId = req.params.profileId;
  
    try {
      const oneProfile = await profiles.findById(profileId);
  
      if (!oneProfile) {
        return res.status(404).json({ success: false, message: 'Profile not found' });
      }
  
      res.status(200).json(oneProfile);
    } catch (err) {
      res.status(500).json({ success: false, message: `Request failed due to ${err}` });
    }
  };
  
    