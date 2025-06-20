const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js")
const Listing = require('../models/listing.js');
const {isLoggedIn,isOwner} = require("../middleware.js")
const ListingController = require("../controllers/listings.js")
const multer  = require('multer')
const{storage} = require("../cloudConfig.js")
const upload = multer({storage });



router.route('/')
  .get(wrapAsync(ListingController.index))
  .post(upload.single('listing[image]'),wrapAsync(ListingController.createListing));

// NEW ROUTE //
router.get("/new", isLoggedIn, ListingController.renderNewForm)

// services //
router.get("/services", wrapAsync(ListingController.showServices));


// SHOW ROUTE //
  router.route("/:id")
  .get( wrapAsync(ListingController.showListing))
  .put(isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync(ListingController.updateListing))
  .delete(isLoggedIn,isOwner,wrapAsync(ListingController.deleteListing));


// EDIT ROUTE //

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.editListing));





module.exports = router;
