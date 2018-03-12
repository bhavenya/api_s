var db = require('../dbconnection')


var firstRun = {
  trainrun: function (callback) {
    db.query('SELECT B.year,c.name, B.KNN_bucket,B.LR_value from bucketizations AS B JOIN countries AS c ON B.country_id = c.id', function(err, rows) {
        if (err) {
            callback(err, null);
        } else
            callback(null, rows);
    });
}
}


module.exports = firstRun;
