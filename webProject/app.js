const express          = require("express"),
      bodyParser       = require("body-parser"),
      mongoose         = require("mongoose"),
      session          = require("express-session"),
      passport         = require("passport"), 
      expressValidator = require("express-validator"),
      flash            = require("connect-flash"),
      mongoStore       = require("connect-mongo")(session),
      hbs              = require("express-handlebars"),
      app              = express();


mongoose.connect("mongodb://localhost:27017/web_project" , {useNewUrlParser: true , useUnifiedTopology: true});
app.set("view engine" , "ejs");
app.engine("hbs" , hbs({extname: "hbs" , defaultLayout: "layout"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Express session middleware
app.use(session({
    secret: "My Secret",
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {maxAge: 180 * 60 * 1000}
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

app.use((req , res , next) => {
  res.locals.user = req.user;
  res.locals.session = req.session;
  next();
});

let users   = require("./routes/users"),
    menu    = require("./routes/menu"),
    booking = require("./routes/booking");

app.use("/users" , users);
app.use("" , menu);
app.use("" , booking);

//INDEX ROUTE
app.get("/" , (req , res) => {
  res.render("index");
});

app.listen(3000, () => {
    console.log("SERVER STARTED....");
});