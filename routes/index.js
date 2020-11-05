var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var Cart = require('../models/cart')
var Product = require('../models/product')

router.get('/', function(req,res){
  
  res.render('shop/index.hbs',
  {
    title:'Shopping Cart'
  });

});


router.get('/add-to-cart/:id', function(req,res,next){
  var productId = req.params.id;

  var cart = new Cart(req.session.cart ? req.session.cart :{})
  Product.findById(productId,function(err,product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart = cart;
    console.log(req.session.cart)
    res.redirect('/products');
  })
})


router.get('/shopping-cart', function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{product:null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products:cart.generatedArray(),totalPrice:cart.totalPrice})
})

router.get('/checkout', function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/checkout',{total: cart.totalPrice})
})

//Exports
module.exports = router;