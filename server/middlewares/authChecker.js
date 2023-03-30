const { getUserSession } = require("../utility/authUtility");

//TODO: Надо переиспользовать функцию

module.exports = async function (req, res, next) {
  const userSession = await getUserSession(req.signedCookies?.session);
  if (userSession !== null) {
    req.session = userSession;
    next();
  } else {
    res.status(299).send('You are not authorized!');
  }
}
