//import artschema
const artworks = require('../Models/artWorkSchema')

//IMPORT USERCHEMA
const users = require('../Models/userSchema')
//add projects
exports.addArtWork = async (req, res) => {
  console.log('inside the addartwork request');
  const userId = req.payload;
  console.log(userId);

  try {
      const user = await users.findById(userId);
      console.log(user);

      const artImg = req.file.filename;
      const { title, description, price,copy, category } = req.body;
      console.log(`${title}, ${description},${copy}, ${price}, ${category}, ${artImg}`);

      const username = user.username; // Get the username from the user object

      const existingArt = await artworks.findOne({ title });

      if (existingArt) {
          res.status(406).json('Artwork name already exists');
      } else {
          const newArt = new artworks({
              name: username,
              title,
              description,
              copy,  // This variable (copy) is not defined in your code, make sure to define it or remove it.
              price,
              category,
              artImg,
              userId
          });

          await newArt.save();
          res.status(200).json(newArt);
      }
  } catch (err) {
      res.status(401).json(`Request failed due to ${err}`);
  }
};
//getAll art work
exports.getAllArtwork = async(req,res)=>{
  try{
    const allArtWork = await artworks.find()
    res.status(200).json(allArtWork)
  } catch (err){
    res.status(401).json(`Request failed due to ${err}`)
  }
}
//getArtist work
exports.getOneArtistWork = async(req,res)=>{
  let userId = req.payload
  try{
    const oneArtistWork = await artworks.find({userId})
    res.status(200).json(oneArtistWork)
  } catch(err){
    res.status(401).json(`Request failed due to ${err}`)
  }
}

// //get the viewartist data
// exports.getOneArtistWorkview = async (req, res) => {
//   let userId = req.params.artistId;
//   console.log('Fetching works for artist with ID:', userId);

//   try {
//     const oneArtistWork = await artworks.find({ userId });
//     console.log('Retrieved works:', oneArtistWork);

//     res.status(200).json(oneArtistWork);
//   } catch (err) {
//     console.error('Error fetching artist works:', err);
//     res.status(401).json(`Request failed due to ${err}`);
//   }
// };
