const { Router } = require('express');
const { getUsersAvatars } = require('../controllers/usersAvatarsController');

const usersAvatarsRoute = Router();

usersAvatarsRoute.get('/:userID', getUsersAvatars);

exports.usersAvatarsRoute = usersAvatarsRoute;