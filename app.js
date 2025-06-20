// if(process.env.NODE_ENV != "production"){
//     require("dotenv").config();
// }
// console.log(process.env.SECRET);

const express = require("express");
const app  = express();
const mongoose = require("mongoose");
const Listing = require('./models/listing.js'); // comment //
const path = require("path");
const metodOverride = require("method-override");
const ejsMate  =  require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js") // comment //
const expressError = require("./utils/expressError.js")
const reviews = require('./models/review.js'); // comment //
const session = require("express-session");
// const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");

// ROUTES SET //
const listingsRoutes = require("./routes/listing.js");
const reviewsRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";
 
//  const dbUrl =process.env.MONGO_URI 

 main()
 .then(() =>{
    console.log("connected to DB")
 })
 .catch((err)=>{
    console.log(err);
 });

 async function main() {
    await mongoose.connect(MONGO_URL, {
});
 }



app.set("view engine", "ejs");
app.set("views",path.join(__dirname ,"views"));
app.use(express.urlencoded({extended: true}));
app.use(metodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


// const store = MongoStore.create({
//     mongoUrl: dbUrl,
//     crypto: {
//         secret: process.env.SECRET,
//     },
//     touchAfter: 24* 3600,
// });

// store.on("error",()=>{
//     console.log("ERROR in SESSION STORE", err)
// })

app.use(session({
  secret: 'your-secret-key',  // ✅ Required
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(flash());




// app.use(session(sessionOptions));
// app.use(flash())

// PASSPORT //

app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// passport part -2 demo //

// app.get("/demouser", async (req,res)=>{
//     let fakeUser = new user({
//         email: "student@gmail.com",
//         username: ""
//     });

//  let registeredUser = await user.register(fakeUser,"helloworld");

//     res.send(registeredUser);
// })

// routes //

app.use("/listings", listingsRoutes); // plural!

app.use("/listings/:id/reviews", reviewsRoutes);

app.use("/", userRoutes); // plural!







// app.get ("/testListing",wrapAsync(async(req,res)=>{
//     let sampleListing = new Listing({
//         title: "my home",
//         description: "by the bich",
//         price: 12000,
//         location: "bhopal",
//         country: "india"
//     })

//    await sampleListing.save();
//    console.log("sample was saved")
//    res.send("successful testing");


// }));


// In routes file

// app.all("*",(req,res,next)=>{
//     next(new expressError(404,"PAGE NOT FOUND !"))
// })

// app.use((err,req,res,next) =>{
//     let {statusCode, message} = err;
//     res.status(statusCode=505).send(message="Something Went Wrong");
//     // res.send("SOMETHING WENT WRONG DETAILS!");
// })

 app.listen(8080,()=>{
    console.log("server is lesninig to port 8080");
});