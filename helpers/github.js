const request = require('request-promise')
const config = require('../config.js')
const Promise = require('bluebird')

const getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  
  return request.get(options)
}

module.exports.getReposByUsername = getReposByUsername
