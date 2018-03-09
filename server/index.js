const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

// const psqlHelper = require('../database/postgres');
// const db = require('../database/db');
// const dbHelpers = require('../database/index');

const app = express();
app.use(express.static(__dirname + '/../build'));
app.use(favicon(__dirname + '/../build/favicon.ico'));
// // note: google chrome can't display local favicons
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}, ${req.status}, ${JSON.stringify(req.body)}`);
  next();
});
app.use(require('body-parser').urlencoded({ extended: true }));

app.listen(process.env.PORT || 3001);
