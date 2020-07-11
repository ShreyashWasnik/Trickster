var Product  = require("./models/product");
    mongoose = require("mongoose");

var products = [
    new Product({
        image: "https://previews.123rf.com/images/espies/espies1711/espies171100846/90523157-bajra-roti-or-jowar-roti-or-indian-bread-made-using-bajra-or-jowar-served-with-green-chilly-thecha.jpg",
        name: "Jowar Roti",
        price: 20
    }),
    new Product({
        image: "https://previews.123rf.com/images/indianfoodimages/indianfoodimages1810/indianfoodimages181002301/110609862-aloo-paratha-indian-potato-stuffed-flatbread-served-with-fresh-curd-and-tomato-ketchup-selective-foc.jpg",
        name: "Aloo Paratha",
        price: 50
    }),
    new Product({
        image: "https://previews.123rf.com/images/indianfoodimages/indianfoodimages1812/indianfoodimages181200109/112973317-jeera-aloo-is-a-indian-main-course-dish-which-goes-well-with-hot-puris-chapatti-roti-or-dal-served-i.jpg",
        name: "Aloo Jeera",
        price: 180
    }),
    new Product({
        image: "https://www.drshikhasharma.com/wp-content/uploads/2018/08/maxresdefault-6.jpg",
        name: "veg-kadai",
        price: 180
    }),
    new Product({
        image: "https://www.ndtv.com/cooks/images/kadhai%20paneer.jpg",
        name: "Panner-Tikka-Masala",
        price: 250
    }),
    new Product({
        image: "https://previews.123rf.com/images/indianfoodimages/indianfoodimages1810/indianfoodimages181001954/110608587-paneer-butter-masala-or-cheese-cottage-curry-in-serving-a-bowl-or-pan-served-with-or-without-roti-an.jpg",
        name: "Panner-Butter-Masala",
        price: 230
    }),
    new Product({
        image: "https://previews.123rf.com/images/csstockimages/csstockimages1710/csstockimages171003247/87839147-indian-punjabi-cuisine-palak-paneer-made-up-of-spinach-and-cottage-cheese-decorative-in-kadhai.jpg",
        name: "Palak-Panner",
        price: 200
    }),
    new Product({
        image: "https://previews.123rf.com/images/indianfoodimages/indianfoodimages1906/indianfoodimages190601299/125405452-mix-vegetable-curry-indian-main-course-recipe-contains-carrots-cauliflower-green-peas-and-beans-baby.jpg",
        name: "Mix-Vegetable",
        price: 190
    }),
    new Product({
        image: "https://previews.123rf.com/images/indianfoodimages/indianfoodimages1901/indianfoodimages190103134/115544803-masala-soya-chunk-curry-made-using-soyabean-nuggets-and-spices-protein-rich-food-from-india.jpg",
        name: "Masala Soya Chunk Curry",
        price: 230
    }),
    new Product({
        image: "https://previews.123rf.com/images/alex9500/alex95001409/alex9500140900168/31678197-indian-butter-chicken.jpg",
        name: "Butter-Chicken",
        price: 265
    }),
    new Product({
        image: "https://previews.123rf.com/images/indianfoodimages/indianfoodimages1807/indianfoodimages180700858/105152569-coriander-or-cilantro-basmati-rice-served-in-a-ceramic-or-terracotta-bowl-it-s-a-popular-indian-or-c.jpg",
        name: "Rice",
        price: 150
    }),
    new Product({
        image: "https://previews.123rf.com/images/espies/espies1712/espies171200493/91679367-dal-makhani-or-dal-makhni-is-a-popular-food-from-punjab-india-made-using-whole-black-lentil-red-kidn.jpg",
        name: "Dal-Makhni",
        price: 120
    }),
    new Product({
        image: "https://previews.123rf.com/images/espies/espies1711/espies171100278/90388916-carrot-halwa-or-gajar-halwa.jpg",
        name: "Gajar-Halwa",
        price: 60
    }),
    new Product({
        image: "https://previews.123rf.com/images/espies/espies1711/espies171100979/90877736-gulab-jamun-gulaab-jamun-is-a-milk-solid-based-indian-sweet-made-in-festival-or-wedding-party.jpg",
        name: "Gulab-Jamun",
        price: 80
    }),
    new Product({
        image: "https://previews.123rf.com/images/svetazarzamora/svetazarzamora1812/svetazarzamora181200015/113907531-mango-lassi-yogurt-or-smoothie-with-turmeric-healthy-probiotic-indian-cold-summer-drink.jpg",
        name: "Mango-Lassi",
        price: 40
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

