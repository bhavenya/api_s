var db = require('../dbconnection')

var firstRun = {
  trainrun: function (params,callback) {
    console.log('From Yr = '+ params[0]);
    console.log('To Yr = '+ params[1]);
    console.log('Stability Yr 1 = ' + params[2]);
    console.log('Stability Yr 2 = ' + params[3]);
    console.log('Fetching Data...');
    db.query("SELECT ad.year,c.country_code,i.feature_name, ad.value, s.TJ_labels,B.KNN_bucket,B.LR_value from aggregated_data AS ad JOIN countries AS c ON ad.country_id = c.id JOIN indicators AS i ON ad.indicator_id = i.id JOIN stabilities AS s ON ad.country_id = s.country_id JOIN bucketizations AS B ON B.country_id = s.country_id AND B.year = s.year WHERE ad.year BETWEEN ? AND ? && s.year BETWEEN ? AND ?",[params[0],params[1],params[2],params[3]],callback)
}
}


module.exports = firstRun;
