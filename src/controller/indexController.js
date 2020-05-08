const User = require('../Model/User');
const passport = require("passport");

exports.signUp = function(req,res,next){
    req.flash('success', 'User has been successfully created ');
    next();
};


exports.signIn = function(req,res,next){
    next();
    req.flash('success', 'Successfully Login')
};

exports.logOut = function(req,res){
    req.logout();
    req.flash("success","Successfully Logout");
    res.redirect("/signin")
};

exports.getSignInPage =  function(req,res){
    res.render("indexView/signin")
};

exports.getSignUpPage =  function(req,res){
    res.render("indexView/signup")
};