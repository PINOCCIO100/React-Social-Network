const { existsSync } = require('fs');
const path = require('path');

exports.getUsersAvatars = (req, res) => {
  const avatarPath = path.resolve(__dirname, '../', 'public', 'avatars', req.params.userID, 'avatar.jpg');
  const defaultPath = path.resolve(__dirname, '../', 'public', 'avatars', 'default.png');
  existsSync(avatarPath) ? res.sendFile(avatarPath) : res.sendFile(defaultPath);
}