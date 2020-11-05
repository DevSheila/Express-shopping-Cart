var express = require('express');
var router = express.Router();

const passport = require('passport');
const {signUpValidationRules , validate} = require('../validator');


router.get('/profile',isLoggedIn, function(req,res,next){
  res.render('user/profile.hbs')
})
router.get('/logout' ,isLoggedIn,function(req,res,next){
  req.logout();
  res.redirect('/products');
})

router.use('/',notLoggedIn, function(req,res,next){
  next();
})

router.get('/signup',function(req,res,next){
  var messages =req.flash('error')
  res.render('user/signup.hbs', {
    
    messages:messages,
    hasErrors:messages.length>0
  })
})

router.post('/signup',signUpValidationRules(),validate,passport.authenticate('local.signup',{

successRedirect:'/user/profile',
failureRedirect:'/user/signup',
failureFlash:true
}));


router.get('/signin',function(req,res,next){
  var messages =req.flash('error')
  res.render('user/signin.hbs', {
  
    messages:messages,
    hasErrors:messages.length>0
  })
})

router.post('/signin',signUpValidationRules(),validate,passport.authenticate('local.signin',{

  successRedirect:'/user/profile',
  failureRedirect:'/user/signin',
  failureFlash:true
  }));







//Exports
module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/products');
}
function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/products');
}