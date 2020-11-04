var Product = require('../models/products');
var mongoose = require('mongoose');

//---------------------CONNECTING TO MONGO DB-------------------

//require uri from mongodb atlas 
const uri  = process.env.ATLAS_URI;
///connect mongoose
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
	); //useNewUrlParser: true, useCreateIndex: true , these are flags that help deal with mongo updates  

var db = mongoose.connection;
db.once('open', ()=>{
    //we are connected!
    console.log("MongoDB database connection established successfully")
});

db.on('error' , console.error.bind(console,'connection error'));
//---------------------CONNECTING TO MONGO DB-------------------


var products =[
    new Product({
        imagePath:'https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/9/7/0/6/2209706-gothic__cdcovers_cc__front.jpg',
        title:'Gothic Video Game',
        description:'AwesomeVideo!!!!',
        price:10
    }),

    new Product({
        imagePath:'https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/9/7/0/6/2209706-gothic__cdcovers_cc__front.jpg',
        title:'Gothic Video Game',
        description:'AwesomeVideo!!!!',
        price:10
    }),

    new Product({
        imagePath:'https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/9/7/0/6/2209706-gothic__cdcovers_cc__front.jpg',
        title:'Gothic Video Game',
        description:'AwesomeVideo!!!!',
        price:10
    }),


    new Product({
        imagePath:'https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/9/7/0/6/2209706-gothic__cdcovers_cc__front.jpg',
        title:'Gothic Video Game',
        description:'AwesomeVideo!!!!',
        price:20
    }),


    new Product({
        imagePath:'https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/9/7/0/6/2209706-gothic__cdcovers_cc__front.jpg',
        title:'Gothic Video Game',
        description:'AwesomeVideo!!!!',
        price:10
    }),


    new Product({
        imagePath:'https://gamespot1.cbsistatic.com/uploads/scale_medium/mig/9/7/0/6/2209706-gothic__cdcovers_cc__front.jpg',
        title:'Gothic Video Game',
        description:'AwesomeVideo!!!!',
        price:10
    })
]

var done =0;
for(var i=0;i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done === products.length){
            exit();
        }
    });
    
}

function exit(){
    mongoose.disconnect();
}