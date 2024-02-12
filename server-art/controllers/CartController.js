const carts = require('../Models/cartSchema')

const artworks = require('../Models/artWorkSchema')

const wishlists = require('../Models/wishlistSchema')

//add to cart
exports.addCartitems = async(req,res)=>{
    console.log('inside cart items');

    try {
        // Assuming the userId and artworkId are available in the request body
        const { userId, artworkId } = req.body;
    
        // Fetch additional details about the artwork
        const artworkDetails = await artworks.findById(artworkId);
    
        if (!artworkDetails) {
          return res.status(404).json({ message: 'Artwork not found' });
        }
    
        // Create a new cart item with additional artwork details
        const cartItem = new carts({
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

//get cartitems
exports.getCartList = async (req, res) => {
  console.log('inside the getwishlist');

  // Assuming userId is extracted from the authentication middleware
  const userId = req.payload;

  try {
      // Fetch wishlist items for the specified userId
      const carttItems = await carts.find({ userId });

      // Respond with the wishlist items
      res.status(200).json({ carts: carttItems });
  } catch (error) {
      console.error('Error fetching cart:', error);

      // Respond with detailed error information
      res.status(500).json({ error: 'Error fetching cart', detailedError: error.message });
  }
};

//delete cart items
exports.deleteCartItems = async(req,res) =>{
  console.log('inside cart items deletion');
  const {id} = req.params

  try{
      const removeProject = await carts.findByIdAndDelete({_id:id})
      res.status(200).json(removeProject)
  } catch(err){
      res.status(401).json(err)
  }
}

//delete all cartitems when checkout
exports.checkout = async (req, res) => {
  console.log('Inside the checkout');

  try {
    // Assuming req.userId holds the correct user ID from the JWT token
    const remove = await carts.deleteMany({ userId: req.userId });
    
    console.log('User ID:', req.userId);
    console.log('Delete Result:', remove);

    res.status(200).json({ message: 'Checkout successful', removedCount: remove.deletedCount });
  } catch (err) {
    console.error('Error during checkout:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//add cart item from wishlist
// exports.addCartitemsFromWishlist = async (req, res) => {
//   console.log('Inside addCartitemsFromWishlist');

//   try {
//     // Assuming the userId and artworkId are available in the request body
//     const { userId, artworkId } = req.body;

//     console.log('Fetching artwork details for artworkId:', artworkId);

//     // Fetch additional details about the artwork
//     const artworkDetails = await artworks.findById(artworkId);

//     if (!artworkDetails) {
//       console.error('Artwork not found for artworkId:', artworkId);
//       return res.status(404).json({ message: 'Artwork not found' });
//     }

//     // Create a new cart item with additional artwork details
//     const cartItem = new carts({
//       userId,
//       artworkId,
//       title: artworkDetails.title,
//       image: artworkDetails.artImg,
//       artistName: artworkDetails.name,
//       price: artworkDetails.price,
//     });

//     // Save the cart item to the database
//     const savedCartItem = await cartItem.save();
//     console.log('Saved Cart Item:', savedCartItem);

//     // Delete the item from the wishlist
//     const deletedFromWishlist = await wishlists.deleteOne({ userId, artworkId });
//     console.log('Deleted from Wishlist:', deletedFromWishlist);

//     if (deletedFromWishlist.deletedCount === 0) {
//       // Handle case where the item was not found in the wishlist
//       console.error('Item not found in wishlist for artworkId:', artworkId);
//       return res.status(404).json({ message: 'Item not found in wishlist' });
//     }

//     // Send a success response
//     console.log('Item added to cart successfully');
//     return res.status(200).json(savedCartItem);
//   } catch (error) {
//     // Handle errors and send an error response
//     console.error('Error adding item to cart:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };



