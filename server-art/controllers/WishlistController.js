//import wislist schema
const wishlists = require('../Models/wishlistSchema')



//import artworks schema
const artworks = require('../Models/artWorkSchema')

exports.addtoWishlist = async(req,res)=>{
    console.log('inside the wishlits items');
    
    try {
      // Assuming the userId and artworkId are available in the request body
      const { userId, artworkId } = req.body;
  
      // Fetch additional details about the artwork
      const artworkDetails = await artworks.findById(artworkId);
  
      if (!artworkDetails) {
        return res.status(404).json({ message: 'Artwork not found' });
      }
  
      // Create a new cart item with additional artwork details
      const cartItem = new wishlists({
        userId,
        artworkId,
        title: artworkDetails.title,
        image: artworkDetails.artImg, // Adjust field name based on your Artwork model
        artistName: artworkDetails.name, // Adjust field name based on your Artwork model
        price: artworkDetails.price,
      });
  
      // Save the cart item to the database
      const savedCartItem = await cartItem.save();
  
      // Send a success response
      return res.status(200).json(savedCartItem);
    } catch (error) {
      // Handle errors and send an error response
      console.error('Error adding item to cart:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getWishlist = async (req, res) => {
    console.log('inside the getwishlist');

    // Assuming userId is extracted from the authentication middleware
    const userId = req.payload;

    try {
        // Fetch wishlist items for the specified userId
        const wishlistItems = await wishlists.find({ userId });

        // Respond with the wishlist items
        res.status(200).json({ wishlist: wishlistItems });
    } catch (error) {
        console.error('Error fetching wishlist:', error);

        // Respond with detailed error information
        res.status(500).json({ error: 'Error fetching wishlist', detailedError: error.message });
    }
};

//item delete wishlist
exports.deleteWishlistItem = async(req,res) =>{
  console.log('inside wishliste deletion');

  const {id} = req.params

  try{
      const removeProject = await wishlists.findByIdAndDelete({_id:id})
      res.status(200).json(removeProject)
  } catch(err){
      res.status(401).json(err)
  }
}

//add to cart
exports.addToCart = async(req,res)=>{
  
}



