const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const psqlHelper = require('../database/postgres');
const db = require('../database/db');
const dbHelpers = require('../database/index');

const app = express();
// app.use(express.static(__dirname + '/../build'));
// app.use(favicon(__dirname + '/../build/favicon.ico'));
// // note: google chrome can't display local favicons
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}, ${req.status}, ${JSON.stringify(req.body)}`);
  next();
});
app.use(require('body-parser').urlencoded({ extended: true }));
app.listen(process.env.PORT || 3001);

app.get('/addDummyData', async(req, res, next) => {
  const output = await dbHelpers.addDummyData();
  res.status(200).json();
});
app.get('/getAll', async(req, res, next) => {
  const output = await dbHelpers.getAll(); // why is 'getAll' blue in vscode? :(
  res.status(200).json({ output });
});
app.get('/validLogin/:username/:password', async(req, res, next) => {
  const output = await dbHelpers.validLogin(req.params.username, req.params.password);
  res.status(200).json({ output });
});
app.get('/usernameAvailable/:username', async(req, res, next) => {
  const output = await dbHelpers.usernameAvailable(req.params.username);
  res.status(200).json({ output });
});
app.post('/newLogin/:username/:password', async(req, res, next) => {
  const output = await dbHelpers.newLogin(req.params.username, req.params.password);
  res.status(201).json();
});
app.get('/getDaysByUsername/:username', async(req, res, next) => {
  const output = await dbHelpers.getDaysByUsername(req.params.username);
  res.status(200).json({ output });
});
app.get('/getActivitiesByUsername/:username', async(req, res, next) => {
  const output = await dbHelpers.getActivitiesByUsername(req.params.username);
  res.status(200).json({ output });
});
app.post('/persistDaysAndActivitiesForUsername/:username', async(req, res, next) => {
  const output = await dbHelpers.persistDaysAndActivitiesForUsername(req.params.username, req.body.days, req.body.activities);
  res.status(201).json();
});