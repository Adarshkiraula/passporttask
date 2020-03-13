var express = require('express');
var router = express.Router();
const model = require('../model/user');
const commonController=require('../controller/commonController');
const passport=require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;






passport.use(new FacebookStrategy({  
  clientID: '208290477095675',
  clientSecret: '3c19cc93042d2129d77e67b09029ac11',
  callbackURL: "https://chandra-verify.herokuapp.com/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email','profileUrl']
},
function(accessToken, refreshToken, profile, cb){

 return cb(null,profile);
}
));


router.get('/',(req,res)=>
{
  res.render('register.html');
});


router.get('/auth/facebook', passport.authenticate('facebook'));




router.get('/auth/facebook/callback',passport.authenticate('facebook', { 
  failureRedirect: '/login' }),(req,res)=>{
    console.log("PPPPPPPPPPPPPPPPPPPPPPPP",req.user)
    res.render('reg.html');
  });

// /* GET home page. */



module.exports = router;
