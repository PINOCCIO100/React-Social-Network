const bcrypt = require('bcrypt');
const UserInfo = require('../models/UserInfo');
const { getUserSession, setUserSession, createAuthStatus } = require('../utility/authUtility');

//TODO: Нужно реализовать удаление сессий по истечению времени

exports.authUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await UserInfo.findOne({ email: userData.email });
    
    // Проверка наличия пользователя с такой почтой
    if (!user) throw new Error(`There no users with email "${userData.email}"`);
    
    // Проверка  захэшированного пароля
    if (!bcrypt.compareSync(userData.password, user.password)) throw new Error(`Wrong password!`);
    
    console.log(`${user.name} logged successfully`);
    
    const userSession = await setUserSession(user);
    res.cookie('session', userSession.session, {
      signed: true,
      expires: userData.rememberMe ? new Date(Date.now() + 99999999) : false
    })
    res.json(createAuthStatus(0, userSession));

  } catch (e) {
    console.log(e.message);
    res.json(createAuthStatus(1));
  }
}

exports.authStatus = async (req, res) => {
  const userSession = await getUserSession(req.signedCookies?.session);
  userSession == null ?
    res.json(createAuthStatus(1, userSession)) :
    res.json(createAuthStatus(0, userSession))
}
