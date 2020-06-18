const express = require("express"),
      router  = express.Router();
      
//Bring in User , product Model
let Product = require("../models/product"),
    Cart    = require("../models/cart"),
    Order   = require("../models/order");

//SHOW ROUTE
router.get("/menu" , (req , res) => {
    let successMsg = req.flash('success')[0];
    Product.find((err , docs) => {
        let productChunks = [];
            chunkSize     = 3;
        for(let i = 0; i < docs.length; i+=chunkSize){
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render("menu" , {products: productChunks , successMsg: successMsg , noMessage: !successMsg});
    });
});

router.get("/add-to-cart/:id" , (req , res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId , (err , product) => {
        if(err) {
            return res.redirect('/');
        }
        cart.add(product , product.id);
        req.session.cart = cart;
        res.redirect('/menu');
    });
});

router.get("/reduce/:id" , (req , res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect("/cart");
});

router.get("/remove/:id" , (req , res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect("/cart");
});


router.get("/cart" , (req, res) => {
    if(!req.session.cart) {
        return res.render("cart" , {products: null});
    } 
    let cart = new Cart(req.session.cart);
    res.render("cart" , {products: cart.generateArray() , totalPrice: cart.totalPrice});
});

router.get("/checkout" , isLoggedIn , (req , res) => {
    if(!req.session.cart) {
        return res.redirect("/cart");
    } 
    let cart = new Cart(req.session.cart);
    let errMsg = req.flash('error')[0];
    res.render("checkout" , {total: cart.totalPrice , errMsg: errMsg , noError: !errMsg});
});

router.post("/checkout" , isLoggedIn , (req ,res) => {
    if(!req.session.cart) {
        return res.redirect("/cart");
    } 
    let cart = new Cart(req.session.cart);

    const stripe = require('stripe')('sk_test_51Guy1pIlDohFxOFcW3ynn9SXfWM22WbIbzPRjFvJvchec1MehINCciJlQVv3t3NgTbBBGKnbfa7p7PS8LpWpbCH500WXl3gVE2');

    stripe.charges.create({
        amount: cart.totalPrice,
        currency: "inr",
        source: req.body.stripeToken,
        description: "Test Charge"
    }, (err , charge) => {
        if(err) {
            req.flash('error' , err.message);
            return res.redirect("/checkout");
        }
        let order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save((err , result) => {
            req.flash('success' , 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/menu');
        });  
    });
});

module.exports = router;

function isLoggedIn(req , res , next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("err" , "You first need to log in");
    req.session.oldUrl = req.url;
    res.redirect("/users/login");
}