const User = require('../Model/User');
const City = require('../Model/CityModel');

exports.isLoggedin = function (req, res, next) {
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect("/signin")
};

exports.checkOwnship = function(req,res, next){
    if(req.isAuthenticated()){
        City.findByPk(req.params.id).then((city) => {
            if(city.getDataValue('UserID') == res.locals.currentUser.id){
                return next();
            }
            else{
                req.flash("errors", "You don't have permission to do that");
                res.redirect('back')
            }
        })
    }
    else{
        res.redirect("/signin")
    }
};