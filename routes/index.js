var express = require('express');
var router = express.Router();
var csrf = require('csurf');
const passport = require('passport');

var csrfProtection = csrf({ cookie: true })

router.use(csrfProtection);
router.get('/', function(req,res){
  
  res.render('shop/index.hbs',
  {
    title:'Shopping Cart'
  });



});


router.get('/user/signup',csrfProtection,function(req,res,next){
  var messages =req.flash('error')
  res.render('user/signup.hbs', {
    csrfToken:req.csrfToken(),
    messages:messages,
    hasErrors:messages.length>0
  })
})

router.post('/user/signup',csrfProtection,passport.authenticate('local.signup',{

successRedirect:'/user/profile',
failureRedirect:'/user/signup',
failureFlash:true
}));

router.get('/user/profile', function(req,res,next){
  res.render('user/profile.hbs')
})


//Exports
module.exports = router;