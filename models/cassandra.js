var db = require('../dbconnection')

console.log("Listening to Port: 4000");
var cassandra = {
  getByYear: function(year,callback){
    return db.query ("SELECT ad.year,c.country_code,i.feature_name, ad.value, s.stability from aggregated_data AS ad JOIN countries AS c ON ad.country_id = c.id JOIN indicators AS i ON ad.indicator_id = i.id JOIN stabilities AS s ON ad.country_id = s.country_id   WHERE ad.year = ? ",[year],callback);
  }
};

module.exports = cassandra;
