const express = require("express");
const router  = express.Router();
//Bring in User Model
let User = require("../models/user");

//booking a table
router.get("/booking" , (req , res) => {
    res.render("booking");
});


module.exports = router;