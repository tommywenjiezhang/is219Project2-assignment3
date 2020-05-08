var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const User = require("../model/User");


passport.use("local-signup",new LocalStrategy(
    {
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    },
    function(req, email, password, done){
        process.nextTick(function() {
            User.findOne({where:{email: email}}).then((user) =>{
                if(user){
                    // user already exist
                    return done(null, false,{message:"user already exist"});
                }
                else{
                   let hashedpassword = User.hashPassword(password);
                    let {name, phone , username} = req.body;
                    let data = {
                        email:email,
                        password: hashedpassword,
                        name: name,
                        username:username,
                        phone:phone
                    };
                    User.create(data).then(function(newUser, created){
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    })
                }
                }
            )
        })
    }
)
);


passport.use('local-signin',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }
            if (!User.validPassword(password, user.password)) {
                req.flash('errors','User enter the wrong password');
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            req.flash('success', " successfully login");
            return done(null, user, {message:"successfully"});
        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
                message: req.flash("error","something wrong with login in")
            });
        });
    }
    ));



passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findByPk(id).then(function(user) {
        if (user) {
            done(null, user.get());

        } else {
            done(user.errors, null);
        }
    });
});