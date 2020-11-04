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
  productId.findById(productId,function(err,product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart = cart;
    res.redirect('/');
  })
})
//Exports
module.exports = router;