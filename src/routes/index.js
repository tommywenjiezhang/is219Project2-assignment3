const router = require('express').Router();
const passport = require('passport');
const {signUp,signIn,logOut, getSignInPage, getSignUpPage} = require('../controller/indexController');


// sign up
router.post('/signup',passport.authenticate('local-signup', {
    successRedirect: '/city',
    failureRedirect: '/register'
}), signUp);

// sign in
router.post("/signin",
    passport.authenticate('local-signin',{
        successRedirect: '/city',
        failureRedirect: '/signin',
        failureFlash: 'Invalid username or password.',
    }), signIn
);
// log out

router.get("/logout",logOut);
// get sign in page

router.get("/signin",getSignInPage);
// register

router.get("/register",getSignUpPage);


module.exports = router;