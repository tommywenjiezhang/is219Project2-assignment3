const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../Data/index");
const User = require('./User')
const City = require('./CityModel')

class Comment extends Model {

}

Comment.init({
    comment_id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        field:'comment_id'
    },
    comment_text:{
        type:DataTypes.STRING,
        field:'comment_text'
    },
    post_id:{
        type:DataTypes.FLOAT(6,4),
        field:'post_id'
    },
    UserID:{
        type:DataTypes.BIGINT,
        field:'UserID'
    }
},{
    sequelize,
    tableName:'Comment',
    freezeTableName:true,
    timestamps: false
});

module.exports = Comment;


