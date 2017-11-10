const express = require('express');
const db = require('../database/index.js')
const bodyParser = require('body-parser')
const request = require('request')
const github = require('../helpers/github.js')
const Promise = require('bluebird')

let app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'))

app.post('/repos', function (req, res) {
  db.duplicateCheck({username: req.body.query})
  .then(() => github.getReposByUsername(req.body.query))
  .then(response => db.formatOptions(JSON.parse(response)))
  .then(optionsArray => db.save(optionsArray))
  .then(() => db.read())
  .catch(() => db.read())
  .then(repos => res.json(repos))
  .catch(err => console.error(err))
});

app.get('/repos', function (req, res) {
  db.read()
  .then((result) => res.json(result))
  .catch(err => {
    console.error(err)
    res.json(err)
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`)
});
