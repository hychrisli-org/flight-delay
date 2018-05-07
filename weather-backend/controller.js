const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
  res.send("Hello");
});

router.post('/', (req, res) =>{
  console.log(req);
  const iata = req.body.iata;
  const localTsStr = req.body.localTs;
  db.getWeahter(iata, localTsStr, (err, data) => {
    if (err != null) res.send(err);
    else if (data.length === 1 )res.send(data[0]);
    else res.status(404).send("Not FOUND")
  })
});

module.exports = router;