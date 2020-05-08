const { Sequelize, DataTypes  } = require('sequelize');
const sequelize = require("../Data/index");

const City = sequelize.define('house',{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        field:'id'
    },
    cityName:{
        type:DataTypes.STRING,
        field:'fldName'
    },
    lat:{
        type:DataTypes.FLOAT(6,4),
        field:'fldLat'
    },
    lng:{
        type:DataTypes.FLOAT(7,4),
        field:'fldLong'
    },
    country:{
        type:DataTypes.STRING,
        field:'fldCountry'
    },
    abbreviation:{
        type:DataTypes.STRING,
        field:'fldAbbreviation'
    },
    capital:{
        type:DataTypes.STRING,
        field:'fldCapitalStatus'
    },
    population:{
        type:DataTypes.BIGINT,
        field:'fldPopulation'
    },
    UserID: {
        type:DataTypes.INTEGER,
        field:'UserID',
    }


},{
    freezeTableName: true,
    timestamps: false,
    tableName:'tblCitiesImport',
    foreignKey: 'UserID'
});

module.exports = City;
