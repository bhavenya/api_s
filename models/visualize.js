var db = require('../dbconnection')


var visualize = {
  visualByYear: function (callback) {
    db.query('SELECT s.year,s.TJ_lables,c.name from stabilities AS s JOIN countries AS c ON s.country_id = c.id', function(err, rows) {
        if (err) {
            callback(err, null);
        } else
            callback(null, rows);
    });
}
}


module.exports = visualize;
