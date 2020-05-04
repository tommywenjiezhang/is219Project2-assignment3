const CityModel = require("../Model/CityModel")

exports.index = function(req, res) {
    CityModel.findAll().then((result) => res.render('index',{cities:result})).catch((err) => console.log(err));
}

exports.show = function(req,res){
    CityModel.findById(req.params.id).then((results) => {
        res.render("show",{city:results})
    }).catch((err) =>{
        console.log(err)
    })
}
exports.new = function(req,res){
    res.render('new');
}

exports.new_post = function(req, res){
    let  {fldName ,fldLat , fldLong , fldCountry , fldAbbreviation , fldCapitalStatus , fldPopulation } = req.body;
    let city = {fldName ,fldLat , fldLong , fldCountry , fldAbbreviation , fldCapitalStatus , fldPopulation};
    CityModel.create(city).then((result) =>
        {
            res.redirect("/");
        }
    ).catch((err)=> {
        console.log(err);
    })
}


exports.edit = function(req,res){
    let cityId = req.params.id
    CityModel.findById(cityId).then((results) => {
        console.log(results)
        res.render("edit", {city:results})
    }).catch((err) =>{
        console.log(err)
    })
}

exports.edit_put =  function(req,res){
    CityModel.updateById(req.params.id,req.body).then((results)=> {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    })
}

exports.delete = function(req,res){
    CityModel.deleteById(req.params.id).then((result)=>{
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    })
}