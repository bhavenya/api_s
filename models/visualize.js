var db = require('../dbconnection')

var visualize = {
  visualByYear: function(visualYear,callback){
console.log('year = '+visualYear);
    return db.query ("SELECT s.year,s.TJ_lables,c.name from stabilities AS s JOIN countries AS C ON s.country_id = c.id WHERE s.year = ?",[visualYear],callback)


  }
}
module.exports = visualize;
