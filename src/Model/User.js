const { Sequelize, Model } = require('sequelize');
const sequelize = require("../Data/index");
const bcrypt = require('bcrypt');


class User extends Model{
    static hashPassword = function(rawPassword){
        return bcrypt.hashSync(rawPassword,bcrypt.genSaltSync(8));
    };

    static validPassword = function(password,storepassword) {
        return bcrypt.compareSync(password, storepassword);
    };
}
User.init({
    id: {
        type: Sequelize.INTEGER,
        field: 'UserID',
        primaryKey: true,
        autoIncrement: true // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    name: {
        type: Sequelize.STRING,
        field:'name'
    },
    username:{
        type: Sequelize.STRING,
        field:"username"
    },
    password:{
        type: Sequelize.STRING,
        field:"password"
    },
    email:{
        type:Sequelize.STRING,
        field:"email"
    },
    phone:{
        type:Sequelize.BIGINT,
        field:"phone"
    },

}, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    timestamps: false// Model tableName will be the same as the model name
});







module.exports = User;
