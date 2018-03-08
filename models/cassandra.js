var db = require('../dbconnection')

console.log("Listening to Port: 4000");
var cassandra = {
  getByYear: function(params,err,result){
    return db.query ("SELECT ad.year,c.country_code,i.feature_name, ad.value, s.TJ_lables from aggregated_data AS ad JOIN countries AS c ON ad.country_id = c.id JOIN indicators AS i ON ad.indicator_id = i.id JOIN stabilities AS s ON ad.country_id = s.country_id WHERE ad.year = 'params[0]' && s.year = 'params[1]' LIMIT 100",[params],function (err,result){
      if (err) throw err;

    });
  }
}




module.exports = cassandra;
