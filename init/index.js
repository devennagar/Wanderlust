const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";

main().then(()=>{
    console.log("connected to DB");
})
.catch(err=>{
    console.log(err)
})


async function main() {
    await mongoose.connect(MONGO_URL);
    
}

const initDB = async() => {
    await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({...obj, owner:"681dcc30c2666a242866a18f"}));
    await Listing.insertMany(initData.data);
    console.log("data saved");

}

initDB();