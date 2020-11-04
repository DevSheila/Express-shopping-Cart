var express = require('express');
var path = require('path');
var favicon =require('serve-favicon');
var logger = require('morgan');
var cookieParser =require('cookie-parser');
var bodyParser =require('body-parser');
var expressHbs = require('express-handlebars');

var routes= require('./routes/index');


var app = express();

//view engine setup
app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'.hbs' }));
app.set('view engine','.hbs');

app.use(logger,'dev');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


//ROUTES
app.use('/', routes);


//catch 404 and forward to error handler
app.use(function(req,res,next){
    var err = new Error('not found');
    err.status = 404;
    next(err);
})

//error handlers

//deelopment error handler
//will print stack trace
if(app.get('env') === 'development'){
    app.use(function(err,req,res,next){
        res.status(err.status || 500);
    })
}

var port = 3000;
app.listen( port, function(){
    console.log("Server is running...On port" + port);
}) 