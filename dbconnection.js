var mysql = require ('mysql');

var connection = mysql.createPool({
  host: 'localhost',
  user:'root',
  password:'password',
  database: 'mse-proj01_development'
});

module.exports = connection;
