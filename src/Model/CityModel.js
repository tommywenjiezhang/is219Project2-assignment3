const connection = require('../Data');

class CityModel{
    static findAll(){
        let result = new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tblCitiesImport', function (err, rows, fields) {
                if (err) reject(err)
                resolve(rows);
            })
        })
        return result;
    }

    static create(city = {}){
        console.log(city)
        let  {fldName ,fldLat , fldLong , fldCountry , fldAbbreviation , fldCapitalStatus , fldPopulation } = city;
        let query = 'INSERT INTO ' +
            'tblCitiesImport (fldName,fldLat,fldLong,fldCountry,fldAbbreviation,fldCapitalStatus,fldPopulation)' +
            ' VALUES (' +
            connection.escape(fldName) + ',' +
            connection.escape(fldLat) + ',' +
            connection.escape(fldLong) + ',' +
            connection.escape(fldCountry)+ ',' +
            connection.escape(fldAbbreviation)+ ',' +
            connection.escape(fldCapitalStatus)+ ',' +
            connection.escape(fldPopulation) + ')'
        let result = new Promise((resolve, reject) => {
            connection.query(query
                , function (err, rows, fields) {
                if (err) {reject(err)}
                resolve(rows);
            })
        })
        return result;
    }

    static findById(id){
        let result = new Promise((resolve, reject) => {
        connection.query('SELECT * FROM tblCitiesImport where id=' + connection.escape(id), function (err, rows, fields) {
            if (err) reject(err)
            resolve(rows[0]);
        })
        })
        return result;
    }

    static updateById(id,city={}){
        let result = new Promise((resolve, reject) => {
            let query = 'UPDATE tblCitiesImport SET ' +
                "fldName="+ connection.escape(city.fldName) + "," +
                "fldLat="+  connection.escape(city.fldLat) + "," +
                "fldLong=" + connection.escape(city.fldLong) + "," +
                "fldCountry=" + connection.escape(city.fldCountry) + "," +
                "fldAbbreviation=" + connection.escape(city.fldAbbreviation) + ","+
                "fldCapitalStatus="+ connection.escape(city.fldAbbreviation) + "," +
                "fldPopulation="+ connection.escape(city.fldPopulation) +
                'where id=' + connection.escape(id);
            connection.query(query, function (err, rows, fields) {
                if (err) reject(err)
                resolve(rows);
            })
        })
        return result;
    }

    static deleteById(id){
        let result = new Promise((resolve, reject) => {
            connection.query('DELETE FROM tblCitiesImport WHERE id='+ connection.escape(id), function (err, rows, fields) {
                if (err) reject(err)
                resolve(rows);
            })
        })
        return result;
    }
}


module.exports = CityModel;