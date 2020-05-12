const City = require("../Model/CityModel");
const Comment = require("../Model/Comment");
const User = require('../Model/User')
City.hasMany(Comment, {foreignKey:'post_id'})
Comment.belongsTo(City, {foreignKey: 'post_id'})
Comment.belongsTo(User, {foreignKey: 'UserID'})


exports.index = function(req, res) {
    City.findAll().then((cities) => res.render('cityView/index' , {cities})).catch((err) => console.log(err));
};
exports.api = function(req, res) {
    City.findAll().then((cities) => res.json(cities)).catch((err) => console.log(err));
};


exports.show = function(req,res){
    City.findByPk(req.params.id, {include: [{
        model:Comment,
        on: {post_id:req.params.id},
        include:[{
            model:User
        }]
    }
    ]}).then((results) => {
        // res.json( results)
        res.render("cityView/show",{city:results})
    }).catch((err) =>{
        console.log(err)
    })
};



exports.new = function(req,res){
    res.render('cityView/new');
};


exports.new_post = function(req, res){
    let  {cityName ,lat , lng , country , abbreviation , capital , population } = req.body;
    let city = {cityName: cityName ,lat , lng , country , abbreviation , capital , population,UserID: res.locals.currentUser.id};
    City.create(city).then((result) =>
        {
            res.redirect("/city");
        }
    ).catch((err)=> {
        console.log(err);
    })
};


exports.edit = function(req,res){
    let cityId = req.params.id;
    City.findByPk(cityId).then((results) => {
        res.render("cityView/edit", {city:results})
    }).catch((err) =>{
        console.log(err)
    })
};

exports.edit_put =  function(req,res){
    City.update(req.body,{where:{id:req.params.id}}).then((results)=> {
        res.redirect("/city")
    }).catch((err) => {
        console.log(err)
    })
};

exports.delete = function(req,res){
    City.destroy({where:{id:req.params.id}, force:true, include:[{model:Comment}]}).then((result)=>{
        res.redirect("back")
    }).catch((err) => {
        console.log(err)
    })
};