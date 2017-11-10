const mongoose = require('mongoose')
const _ = require('lodash')
const Promise = require('bluebird')

mongoose.connect('mongodb://localhost/fetcher', { useMongoClient: true })

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
  avatarUrl: String,
  githubId: {type: Number, unique: true, index: true}
})

const Repo = mongoose.model('Repo', repoSchema)

const save = (optionsArray) => {
  return Promise.map(optionsArray, repoObj => {
    let newWrite = new Repo(repoObj)
    return newWrite.save()
  })
}

const read = () => {
  console.log('read')
  let responseObj = {};
  return Repo.find().sort({forkCount: -1}).limit(25)
  .then(results => {
    responseObj.repos = results
    return getListLength()
  })
  .then(number => responseObj.number = number)
  .then(() => responseObj)
  .catch(err => console.error(err))
}

const getListLength = () => {
  console.log('getListLength')
  return Repo.find()
  .then(array => array.length)
  .catch(err => console.error(err))
}

const formatOptions = (JSONresponse) => {
  console.log('formatOptions')
  return _.map(JSONresponse, repoObj => {
    return {
      username: repoObj.owner.login,
      repoName: repoObj.name,
      repoUrl: repoObj.html_url,
      description: repoObj.description || 'no description',
      forkCount: repoObj.forks,
      avatarUrl: repoObj.owner.avatar_url,
      githubId: repoObj.id
    }
  })
}

const duplicateCheck = (queryObj) => {
  console.log(queryObj)
  return new Promise((resolve, reject) => {
    Repo.find(queryObj, (err, result) => {
      console.log(result)
      if (result.length > 0) {
        console.log('reject')
        reject(result)
      } else {
        console.log('resolve')
        resolve(result)
      }
    })
  })
}

module.exports.save = save
module.exports.read = read
module.exports.formatOptions = formatOptions
module.exports.duplicateCheck = duplicateCheck
module.exports.getListLength = getListLength
