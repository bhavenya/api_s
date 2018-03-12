var db = require('../dbconnection')

console.log("Listening to Port: 4000");
var cassandra = {
  getByYear: function(params,callback){
    console.log('Feature set Yr = '+params[0]);
    console.log('Stability Yr = '+params[1]);
    console.log('Fetching Data...');
    return db.query ("SELECT ad.year,c.country_code,i.feature_name, ad.value, s.TJ_labels,B.KNN_bucket,B.LR_value from aggregated_data AS ad JOIN countries AS c ON ad.country_id = c.id JOIN indicators AS i ON ad.indicator_id = i.id JOIN stabilities AS s ON ad.country_id = s.country_id JOIN bucketizations AS B ON B.country_id = s.country_id AND B.year = s.year WHERE ad.year = ? && s.year = ?",[params[0],params[1]],callback)

  }
}




module.exports = cassandra;
