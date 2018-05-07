const mysql = require('mysql');
require('dotenv').config();

exports.cnxPool = mysql.createPool({
  connectionLimit: 5,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: 'flight'
});


exports.getWeahter = (iata, localTsStr, cb) => {
  const localTs = new Date(localTsStr);
  const myQuery = `SELECT * FROM AIRPORT_WEATHER WHERE iata = '${iata}' and local_ts= STR_TO_DATE('${localTsStr}', '%Y-%m-%d %H:%i:%s')`;
  console.log(myQuery);
  this.cnxPool.query(myQuery, (err, data) =>{
    console.log(err);
    console.log(data);
    if (err) cb(err);
    else cb(null, data)
  })
};