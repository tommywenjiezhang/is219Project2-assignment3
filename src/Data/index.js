const mysql = require('mysql');

const connection =  mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    port: '32000',
    user: 'root',
    password: 'root',
    database: 'citiesData'
});


module.exports = connection;
