const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
       // ref: 'User',  // Reference to the User model
        required: true
      },
      artworkId: {
        type: String,
       // ref: 'Artwork',  // Reference to the Artwork model
        required: true
      },
      title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const wishlists = mongoose.model("wishlists",wishlistSchema)

module.exports = wishlists