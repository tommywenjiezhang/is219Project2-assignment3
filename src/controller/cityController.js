const CityModel = require("../Model/CityModel");

exports.index = function(req, res) {
    CityModel.findAll().then((cities) => res.render('cityView/index' , {cities})).catch((err) => console.log(err));
};
exports.api = function(req, res) {
    CityModel.findAll().then((cities) => res.json(cities)).catch((err) => console.log(err));
};

exports.show = function(req,res){
    CityModel.findByPk(req.params.id).then((results) => {
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
    CityModel.create(city).then((result) =>
        {
            res.redirect("/city");
        }
    ).catch((err)=> {
        console.log(err);
    })
};


exports.edit = function(req,res){
    let cityId = req.params.id;
    CityModel.findByPk(cityId).then((results) => {
        res.render("cityView/edit", {city:results})
    }).catch((err) =>{
        console.log(err)
    })
};

exports.edit_put =  function(req,res){
    CityModel.update(req.body,{where:{id:req.params.id}}).then((results)=> {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    })
};

exports.delete = function(req,res){
    CityModel.destroy({where:{id:req.params.id}}).then((result)=>{
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    })
};