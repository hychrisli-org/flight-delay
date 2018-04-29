var express = require('express');
var request = require('request');
const cors = require('cors');
require('dotenv').config()

var app = express();


const corsOptions = {
  credentials: true,
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE']
};



app.use(cors(corsOptions));

app.use('/', function(req, res) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  var url = req.url.substring(1);
  console.log(url);
  request
    .get(url, {
      auth:{
        user:  process.env.FLIGHTAWARE_USERNAME,
        pass:  process.env.FLIGHTAWARE_PASSWORD,
      }
    })
    .pipe(res, {end: true})
    .on('error',e => {console.log(e)});
});

app.listen(process.env.PORT || 8080);