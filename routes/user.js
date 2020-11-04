var express = require('express');
var router = express.Router();
var csrf = require('csurf');
const passport = require('passport');
const {signUpValidationRules , validate} = require('../validator');

var csrfProtection = csrf({ cookie: true })

router.use(csrfProtection);

router.get('/profile',isLoggedIn, function(req,res,next){
  res.render('user/profile.hbs')
})
router.get('/logout' ,isLoggedIn,function(req,res,next){
  req.logout();
  res.redirect('/');
})

router.use('/',notLoggedIn, function(req,res,next){
  next();
})

router.get('/signup',csrfProtection,function(req,res,next){
  var messages =req.flash('error')
  res.render('user/signup.hbs', {
    csrfToken:req.csrfToken(),
    messages:messages,
    hasErrors:messages.length>0
  })
})

router.post('/signup',signUpValidationRules(),validate,csrfProtection,passport.authenticate('local.signup',{

successRedirect:'/user/profile',
failureRedirect:'/user/signup',
failureFlash:true
}));


router.get('/signin',csrfProtection,function(req,res,next){
  var messages =req.flash('error')
  res.render('user/signin.hbs', {
    csrfToken:req.csrfToken(),
    messages:messages,
    hasErrors:messages.length>0
  })
})

router.post('/signin',signUpValidationRules(),validate,csrfProtection,passport.authenticate('local.signin',{

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
  res.redirect('/');
}
function notLoggedIn(req,res,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}