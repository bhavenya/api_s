var db = require('../dbconnection')


var visualize = {
  visualByYear: function (callback) {
    db.query('SELECT B.year,c.name, B.KNN_bucket,B.LR_value, s.TJ_labels from bucketizations AS B JOIN countries AS c ON B.country_id = c.id JOIN stabilities AS s ON s.year = B.year AND s.country_id = B.country_id', function(err, rows) {
        if (err) {
            callback(err, null);
        } else
            callback(null, rows);
    });
}
}


module.exports = visualize;
