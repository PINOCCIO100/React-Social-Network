const { readFileSync } = require('fs');
const path = require('path');

exports.debugMW = async (req, res, next) => {
  // const usersProfileInfo = JSON.parse(readFileSync(path.resolve('models', 'usersProfileInfo.json')));
  next();
}