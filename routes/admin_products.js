var express = require('express');
var router = express.Router();
const fs = require('fs');

// const path = require('path'); 
// const mkdirp = require('mkdirp'); 

const upload = require('express-fileupload')
router.use(upload())
const { check, validationResult } = require("express-validator");
const{ validate} = require('../validator');

//--------------------------------------------------------------------

// GET PRODUCTS MODEL 
var Product = require ('../models/product');

//GET PRODUCT INDEX
router.get('/', function(req,res){


//    Product.find(function(err,product){
//        res.render('shop/index.hbs',{
//            products:product

//        });

//    })
// Product.find(function(req,res,next){
    Product.find(function(err,docs){
        var productChunks =[];
        // var chunkSize =3;
        for(var i= 0; i<docs.length; i++){
            productChunks.push(docs);
        }
    res.render('shop/index.hbs',{
                products:docs });

    })
// })

  
  });


//GET ADD PRODUCT
router.get('/add-product', function(req,res){
    var title = "";
    var desc ="";
    var price ="";

    // Product.find(function(err,categories){
        res.render('admin/add_product.hbs' , {
            
            title:title,
            desc:desc,
            price:price
        });
    
    // })
}); 



   

//POST ADD PRODUCT
router.post ('/add-product', [
    check('title', 'Title must have a value.').notEmpty(),
    check('desc', 'Description must have a value.').notEmpty(),
    check('price', 'Price must have a decimal value.').isDecimal(),
    // check('image', 'You must upload an image').notEmpty()
],validate,(req,res)=>{

    var title = req.body.title;
    var slug = req.body.title;
    var desc = req.body.desc;
    var price = req.body.price;
    // var category = req.body.category;
    var image = req.files.image.name;

                
    // if (errors) { 
        //----------
        // Category.find(function (err, categories) {
            res.render('admin/add_product.hbs', {
                // errors: errors,
                
                title: title,
                desc: desc,
                // categories: categories,
                price: price,
                image:image
            });
        // });

        //------------
    // } else {
        //------------
     
        Product.findOne({slug:slug}, function (err, product) {
            if (product) {
                req.flash('danger', 'Product title exists, choose another.');
                // Category.find(function (err, categories) {
                    res.render('admin/add_product.hbs', {
                        title: title,
                        desc: desc,
                       
                        price: price,
                        image:image
                    });
                // });
            } 
            else {
              

               
                var price2 = parseFloat(price).toFixed(2);

                var product = new Product({
                    title: title,
                    slug: slug,
                    desc: desc,
                    price: price2,
                    
                    image: image
                   
                });
            
               
        }

                product.save(function (err) {
                   
                    if (err)
                        return console.log(err);
                    
                        if(req.files){
                            console.log(req.files)
                            var image = req.files.image;
                            var imagename = image.name;
                                
                            fs.mkdir('./productImages/',function(err) {
                                    if (err) {
                                    console.log(err)
                                    } else {
                                    console.log("New directory successfully created.")
                                    }
                                })
                            var imagePath = './productImages/';
        
                            console.log(imagename);
                                 image.mv(imagePath +'/'+product._id+imagename,function(err){
                                        if(err){
                                            res.send(err)
                                        }else{
                                            console.log("Image uploaded");
                                        }
                               })
                        }
    
                    // req.flash('success', 'Product added!');
                    // res.redirect('/admin/products');
                });
            
        });
  
        //------------
        // }

}),    




 

module.exports = router;