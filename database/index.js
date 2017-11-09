const mongoose = require('mongoose');
const _ = require('lodash')
const Promise = require('bluebird')

mongoose.connect('mongodb://localhost/fetcher')

const db = mongoose.connection

db.on('error', console.log.bind(console, 'connection error: '))

db.once('open', function() {
  console.log('hello world of mongodb!')
})

const repoSchema = mongoose.Schema({
  username: String,
  repoName: String,
  repoUrl: String,
  description: String,
  forkCount: Number,
  avatarUrl: String
})

const Repo = mongoose.model('Repo', repoSchema)

const save = (optionsArray) => {
  return Promise.map(optionsArray, repoObj => {
    let newWrite = new Repo(repoObj)
    return newWrite.save()
  })
}

const read = username => {
  return Repo.find({username: username})
}

const formatOptions = (JSONresponse) => {
  return _.map(JSONresponse, repoObj => {
    return {
      username: repoObj.owner.login,
      repoName: repoObj.name,
      repoUrl: repoObj.url,
      description: repoObj.description,
      forkCount: repoObj.forks,
      avatarUrl: repoObj.owner.avatar_url
    }
  })
}

module.exports.save = save
module.exports.read = read
module.exports.formatOptions = formatOptions
