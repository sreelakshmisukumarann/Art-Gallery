//path to resolve the client request

const express = require('express')

//import controller
const registerController = require('../controllers/registerController')

//import artcontroller
const artWorkController = require('../controllers/ArtController')

//import profilecontoller
const addProfileController = require('../controllers/profileController')

//import admin controller
const adminRegisterController = require('../controllers/AdminContoller')

//wishlist controller
const wishlistController = require('../controllers/WishlistController')

//cart controller
const cartController = require('../controllers/CartController') 

//delivery details contoller
const deliveryDetails = require('../controllers/DeliveryController')
//import jwt middleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')

//import profile middleware
const profileMiddleware = require('../Middleware/profileMiddleware')

//import authorization middleware
const authorizationMiddleware = require('../Middleware/authorizationMiddleware')

//import multer
const multerConfig = require('../Middleware/multerMiddleware')

const profileMulter = require('../Middleware/profileMulter')

const router = new express.Router()

//path  for reslving register
    //register
    router.post('/register',registerController.register)

    //login
    router.post('/login',registerController.login)

    //add project
    router.post('/artwork/add',jwtMiddleware,multerConfig.single('artImg'),artWorkController.addArtWork)

    //get all projects
    router.get('/artwork/all-work',artWorkController.getAllArtwork)

    //get one artist work
    router.get('/artwork/artist-work',jwtMiddleware,artWorkController.getOneArtistWork)

    //add profile details
    router.post('/profile/addprofile',profileMiddleware,profileMulter.single('profileImg'),addProfileController.addProfile)

    //get all profiles info
    router.get('/profile/all-profile',addProfileController.getAllProfile)

   //get one profile 
   router.get('/profile/login-profile',profileMiddleware,addProfileController.getprofile)

   // Add a new route for getting a specific profile by ID
   router.get('/profile/:profileId',addProfileController.getprofileById);

//    get a route for spectic artist all work
//  router.get('/artworks/artist/:artistId',artWorkController.getOneArtistWorkview);

  //addmin register
  router.post('/admin/register',adminRegisterController.adminregister)

  //admin login
  router.post('/admin/login',adminRegisterController.adminlogin)

  router.post('/artworks/updateStatus',adminRegisterController.updateArtworkStatus)

  //add to wishlist
  router.post('/wishlist/add-wishlist',wishlistController.addtoWishlist);

  // Route to get user's wishlist
  router.get('/wishlist/user-wishlist',profileMiddleware,wishlistController.getWishlist);

  //route to add cart items
  router.post('/cart/add-to-cart',cartController.addCartitems);

  // Route to get user's cart
  router.get('/cart/user-cart',profileMiddleware,cartController.getCartList);
  
  //detelete wishlist
  router.delete('/wishlist/remove/:id', jwtMiddleware, wishlistController.deleteWishlistItem);

  //delete cart
  router.delete('/cart/remove/:id',jwtMiddleware,cartController.deleteCartItems)

  //add delivery details
  router.post('/delivery/delivery-details',profileMiddleware,deliveryDetails.addDeliveryDetails)

  //edit deliverydetails
  router.put('/delivery/edit',profileMiddleware,deliveryDetails.editDelivery)

  //get one delivery details
  router.get('/delivery/details/user-delivery',jwtMiddleware,deliveryDetails.getUserDeliveryDetails)

  //checkout
  router.delete('/checkout/remove',authorizationMiddleware,cartController.checkout)

  //add to cart from wishlist
  //router.post('/cart/add-from-wishlist',cartController.addCartitemsFromWishlist)

  //route to add cart items from wishlist
  router.post('/cart/add-from-wishlist',wishlistController.addToCart);

  



module.exports = router