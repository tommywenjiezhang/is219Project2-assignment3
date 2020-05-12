const Comment  = require('../Model/Comment');
const City = require('../Model/CityModel')
const User = require('../Model/User')


Comment.belongsTo(User, {as: 'user',foreignKey: 'UserID', targetKey: 'id'});
Comment.belongsTo(City, {as:'city', foreignKey: 'post_id',targetKey : 'id'});

exports.comment_create = function(req,res){
    City.findByPk(req.params.id).then(function(city){
        res.render("commentView/new", {city:city})
    }).catch(err => console.log(err))
}

exports.post_new_comment = (req,res) => {
    const newComment =
    {
        post_id: req.params.id,
        UserID: req.user.id,
        comment_text: req.body.comment_body
    };

    console.log(newComment);

    Comment.create(newComment).then(function(comment){
        console.log(comment);
        res.redirect('/city/' + req.params.id);
    }
    ).catch((err) => {
        console.log(err)
        res.redirect('back')
    })
}

exports.edit_comment =  function(req, res){
    Comment.findByPk(req.params.comment_id,{include:
            {
                model:User
            }}) .then(function(foundComment){
                // res.json(foundComment)
            res.render("commentView/edit", {city_id:req.params.id, comment:foundComment});
    }).catch((err) => {
        res.redirect('back')
    });
}

exports.update_comment = function(req, res){
    console.log(req.body)
    Comment.update(req.body.comment,{
        where:{
            comment_id:req.params.comment_id
        }}).then(function(success){
        res.redirect("/city/" + req.params.id )
    }).catch((err) => {
        res.redirect('back')
    })
}


exports.destroy_comment = function(req, res){
    //findByIdAndRemove
    Comment.destroy({
        where: {
            comment_id: req.params.comment_id
        }
    }).then((comment) => {
        res.redirect('/city/' + req.params.id)
    }).catch((err) => {
        res.redirect('back')
    })
}