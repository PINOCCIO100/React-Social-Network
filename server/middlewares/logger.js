const colors = require('colors');

exports.logger = (req, res, next) => {
  // console.group(`${colors.red.bold('Request:')} ${colors.cyan.bold(req.originalUrl)}`);
  console.group(`${colors.red.bold('Request-Headers:')} ${colors.cyan.bold(req.headers)}`);
  // console.log(`${colors.red.bold('Params:')} ${colors.cyan.bold(req.params)}`)
  // console.log(`${colors.red.bold('Body:')} ${colors.cyan.bold(req.body)}`)
  // console.log(`${colors.red.bold('Cookies:')} ${colors.cyan.bold(req.signedCookies)}`)
  // console.log(`${colors.red.bold('Hostname:')} ${colors.cyan.bold(req.hostname)}`)
  console.groupEnd();
  next();
}