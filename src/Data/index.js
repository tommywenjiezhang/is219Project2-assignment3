var {Sequelize}  = require('sequelize');

var sequelize = new Sequelize('citiesData', 'root', 'root',{
    host: 'localhost',
    port:32000,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false
});


module.exports = sequelize;