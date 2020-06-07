const express = require("express");
const router  = express.Router();
//Bring in User Model
let User = require("../models/user");

//SHOW ROUTE
router.get("/menu" , (req , res) => {
    res.render("menu");
});

module.exports = router;