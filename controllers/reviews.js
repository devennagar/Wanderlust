const Listing = require("../models/listing");
const reviews = require("../models/review");

module.exports. createReviews = async(req,res)=>{
let listing = await Listing.findById(req.params.id)
let newReview = new reviews(req.body.review);
newReview.author = req.user._id;
// console.log(newReview);
listing.reviews.push(newReview);

await newReview.save();
await listing.save();

req.flash("success","New Review Created!");
res.redirect(`/listings/${listing._id}`);
};

module.exports. deleteReviews = async(req,res)=>{
    let { id,reviewId } = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await reviews.findByIdAndDelete(reviewId)

    req.flash("success","Delete Review !");
    res.redirect(`/listings/${id}`);


}