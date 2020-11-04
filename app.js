var express = require('express');
var hbs = require('hbs');
var csrf = require('csurf');
var expressHbs = require('express-handlebars');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var passport = require('passport');
var flash = require('connect-flash')

var app = express();



require('dotenv').config();

//---------------------CONNECTING TO MONGO DB-------------------

//require uri from mongodb atlas 
const uri  = process.env.ATLAS_URI
///connect mongoose
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
	); //useNewUrlParser: true, useCreateIndex: true , these are flags that help deal with mongo updates  

var db = mongoose.connection;
db.once('open', ()=>{
    //we are connected!
    console.log("MongoDB database connection established successfully")
});

db.on('error' , console.error.bind(console,'connection error'));
//view engine setups
app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'.hbs' }));
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials')


app.use(express.static(path.join(__dirname,'public'))); 

require('./config/passport')

//---------------------CONNECTING TO MONGO DB-------------------
// app.use(bodyParser.json)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session(
    {
    secret:'mysupersecret',
    resave:false ,
    saveUninitialized:false}
));
app.use(csrf({ cookie: true }))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    var token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
    next();
  });


  app.use(function(req,res,next){
      res.locals.login = req.isAuthenticated();
      next();
  })
  
//ROUTES
var index= require('./routes/index.js');
var userRoutes = require('./routes/user')


app.use('/user', userRoutes);
app.use('/', index);



var port = 3000;
app.listen( port, function(){
    console.log("Server is running...On port" + port);
}) 





