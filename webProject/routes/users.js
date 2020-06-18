const express  = require("express"),
      router   = express.Router(),
      bcrypt   = require("bcryptjs"),
      passport = require("passport")

//Bring in User Model
let User  = require("../models/user"),
    Order = require("../models/order"),
    Cart  = require("../models/cart")

//profile page
router.get("/profile" , isLoggedIn , (req , res) => {
    Order.find({user: req.user}, (err , orders) => {
        if(err) {
            return res.write("ERROR!")
        }
        var cart;
        orders.forEach((order) => {
            cart = new Cart(order.cart);
            order.items = cart.generateArray()
        });
        res.render('profile.hbs' , {orders: orders , user: req.user});
    });
});

//Logout
router.get("/logout" , (req , res) => {
    req.logout();
    req.flash("succes" , "You are logged out");
    res.redirect("/users/login");
});

router.use("/" , notLoggedIn , (req , res , next) => {
    next();
});

//Register Form
router.get("/register" , (req , res) => {
    res.render("register");
});

//Register Process
router.post("/register" , (req , res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name' , 'Name is required').notEmpty();
    req.checkBody('email' , 'Email is required').notEmpty();
    req.checkBody('email' , 'Email is not valid').isEmail();
    req.checkBody('username' , 'Username is required').notEmpty();
    req.checkBody('password' , 'Password is required').notEmpty();
    req.checkBody('password2' , 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors) {
        res.render('register' , {
            errors: errors
        });
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        bcrypt.genSalt(10 , (err , salt) => {
            bcrypt.hash(newUser.password, salt , (err , hash) => {
                if(err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save((err) => {
                    if(err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('succes' , 'You are now registered and can login');
                        res.redirect("/users/login");
                    }
                })
            });
        }); 
    }
});

//login form
router.get("/login" , (req , res) => {
    res.render("login");
});

//login process
router.post("/login" , (req , res , next) => {
    passport.authenticate("local" , {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true 
    })(req , res , next);
});

module.exports = router;

function isLoggedIn(req , res , next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error" , "You first need to log in");
    res.redirect("/users/login");
}

function notLoggedIn(req , res , next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}