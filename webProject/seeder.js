var Product  = require("./models/product");
    mongoose = require("mongoose");

var products = [
    new Product({
        image: "../stylesheets/images/veg-kofta.jpeg",
        name: "veg-kofta",
        price: 200
    }),
    new Product({
        image: "../stylesheets/images/veg-kadai.jpeg",
        name: "veg-kadai",
        price: 180
    }),
    new Product({
        image: "../stylesheets/images/panner-tikka.jpeg",
        name: "Panner-Tikka-Masala",
        price: 250
    }),
];

function seedDB() {
    Product.remove({} , (err) => {
        if(err) {
            console.log(err);
        }
    });
    
    let done = 0;
    products.forEach((product) => {
        product.save((err , result) => {
            done++;
        });
    });
}

module.exports = seedDB;

