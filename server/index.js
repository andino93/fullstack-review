const express = require('express');
const db = require('../database/index.js')
const bodyParser = require('body-parser')
const request = require('request')
const _ = require('lodash')
const github = require('../helpers/github.js')

let app = express()

// app.use(request);
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'))

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body.query)
  .tap(result => console.log('post repo query: ', result))
  .then(result => {
    // if results come back
    // need to serve content to enduser
  })
  .catch(err => {
    console.log('catch case on post')
    // initite get request to github with username query
    // then on response from github
    github.getReposByUsername(req.body.query)
    // format JSONresponse into model Schema
    .then(response => db.formatOptions(response))
    // pass array into db save
    .then(optionsArray => db.save(optionsArray))
    // also respond to client that request was made
    .then(result => res.end())
    .catch(err => console.error(err))
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.read(req.body.query)
  .then((result) => res.json(result))
  .catch(err => {
    console.error(err)
    res.end()
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`)
});
