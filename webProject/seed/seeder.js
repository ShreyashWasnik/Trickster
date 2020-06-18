var Product  = require("../models/product");
const { exists } = require("../models/product");
const { Mongoose } = require("mongoose");
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/web_project" , {useNewUrlParser: true , useUnifiedTopology: true});

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
    })
];

let done = 0;
products.forEach((product) => {
    product.save((err , result) => {
        done++;
        if(done === products.length){
            exit();
        }
    });
});

function exit(){
    mongoose.disconnect();
}