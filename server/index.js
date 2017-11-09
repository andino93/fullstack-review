const express = require('express');
const db = require('../database/index.js')
const bodyParser = require('body-parser')
const request = require('request')
const _ = require('lodash')
const github = require('../helpers/github.js')
const Promise = require('bluebird')

let app = express()

// app.use(request);
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'))

app.post('/repos', function (req, res) {
  db.duplicateCheck({username: req.body.query})
  .then(results => {
    if (results.length > 0) {
      db.read()
      .then(result => res.json(result))
    } else {
      return github.getReposByUsername(req.body.query)
      .then(response => db.formatOptions(JSON.parse(response)))
      .then(optionsArray => db.save(optionsArray))
      .then(result => db.read())
      .then(result => res.json(result))
    }
  })
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
