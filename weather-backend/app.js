const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const  app = express();

const controller = require('./controller');

const corsOptions = {
  credentials: true,
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE']
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use('/', controller);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 8081);