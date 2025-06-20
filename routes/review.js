const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js")
const review = require("../models/review.js");
const Listing = require("../models/listing.js");

 const reviewController = require("../controllers/reviews.js");

//post review route //

router.post("/", reviewController.createReviews )

// DELETE REVIEW ROUTE //

router.delete("/:reviewId", wrapAsync(reviewController.deleteReviews))

module.exports = router;