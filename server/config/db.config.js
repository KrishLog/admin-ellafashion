const mysql = require('mysql');

const con = mysql.createPool({
  host: 'ejmusiq.com',
  user: 'ellafashion',
  password: 'puppy@23',
  connectionLimit: 10,
  timezone: 'utc',
});

module.exports = con;
