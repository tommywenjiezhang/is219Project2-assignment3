var {Sequelize}  = require('sequelize');

var sequelize = new Sequelize('citiesData', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});


module.exports = sequelize;