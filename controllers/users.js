const User = require("../models/user");


// SIGNUP FORMATE //
module.exports.renderSignupForm =  (req,res) => {
    res.render("users/signup.ejs");
}

// SIGNUP //
module.exports.signUp = async (req,res)=>{
    try{
        let {username, email, password} = req.body;
    const newUser = new User({email,username})
    const registerduser = await User.register(newUser,password);
    console.log(registerduser);
    req.login(registerduser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "user was registerd ")
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    };
    
};
// LOGIN FORMATE //
module.exports.renderLoginForm =  (req,res)=>{
    res.render("users/login.ejs");
};

// LOGIN // 
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back Wanderlust you are loged in!");
    res.redirect(res.locals.redirectUrl || '/listings');   
};

 // LOGOUT //
module.exports.logout = (req,res, next)=>{
    req.logout((err)=>{
        if(err){
         return next();
        }
        req.flash("success", "you are loged out now !");
        res.redirect("/listings");
    })
}
