const express          = require("express"),
      app              = express(),
      bodyParser       = require("body-parser"),
      mongoose         = require("mongoose"),
      expressValidator = require("express-validator"),
      flash            = require("connect-flash"),
      session          = require("express-session"),
      passport         = require("passport")


mongoose.connect("mongodb://localhost:27017/web_project" , {useNewUrlParser: true , useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));

//Express session middleware
app.use(session({
    secret: "My Secret",
    resave: true,
    saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use((req , res , next) => {
    res.locals.messages = require('express-messages')(req , res);
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

//passport config
require("./config/passport")(passport);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*" , (req , res , next) => {
  res.locals.user = req.user || null;
  next();
});

//INDEX ROUTE
app.get("/" , (req , res) => {
  res.render("index");
});

let users   = require("./routes/users");
    menu    = require("./routes/menu");
    booking = require("./routes/booking");



app.use("" , menu);
app.use("" , booking);
app.use("/users" , users);

app.listen(3000, () => {
    console.log("SERVER STARTED....");
});