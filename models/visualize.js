var db = require('../dbconnection')


var visualize = {
  visualByYear: function (callback) {
    db.query('SELECT s.year,c.name,s.TJ_labels, B.KNN_bucket,B.LR_value from stabilities AS s JOIN countries AS c ON s.country_id = c.id JOIN bucketizations AS B on b.year = s.year', function(err, rows) {
        if (err) {
            callback(err, null);
        } else
            callback(null, rows);
    });
}
}


module.exports = visualize;
