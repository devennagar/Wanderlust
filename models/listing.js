const mongoose = require("mongoose");
const review = require("./review");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
   type: String,
   require: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  owner: {
    type: Schema.ObjectId,
    ref: "User",
  }

});

// delete data by add review than the all listings // 

listingSchema.post("findOneAndDelete", async(listing)=>{
 if(listing){
  await review.deleteMany({_id : {$in: listing.reviews}});
 }
});

const Listing = mongoose.model("Listing", listingSchema)

module.exports  = Listing;