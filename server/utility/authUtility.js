const Session = require("../models/Session");
const uuid = require('uuid');

// Если в БД имеется такой id, то возвращается документ сессии, иначе null

exports.getUserSession = async function (clientSessionID) {
  const userSession = await Session.findOne({ session: clientSessionID });
  return (clientSessionID != null && userSession != null) ? userSession : null

}

// Формируется статус аутентификации 

exports.createAuthStatus = function (resultCode, userSession = null) {
  if (userSession == null) resultCode = 1;
  switch (resultCode) {
    case 0:
      return {
        resultCode,
        message: [],
        data: {
          id: userSession?.id,
          email: userSession?.email,
          name: userSession?.name,
        }
      }
    case 1:
    default:
      return {
        resultCode,
        message: ['You are not authorized'],
        data: {}
      }
  }
}

exports.setUserSession = async function (user) {
  // user - документ из коллекции usersInfo 
  const sessionID = uuid.v4();
  let session = await Session.findOne({ id: user.id });
  if (session) {
    session.session = sessionID;
    session.save();
  } else {
    session = await Session.create({
      id: user.id,
      email: user.email,
      name: user.name,
      session: sessionID,
    })
  }
  return session
}