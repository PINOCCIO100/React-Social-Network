const { Router } = require('express');

const { getUsersList, getUserProfile } = require('../controllers/usersProfileController.js');

const usersProfileRoute = Router();

usersProfileRoute.get('/', getUsersList);

usersProfileRoute.get('/:userID', getUserProfile);

exports.usersProfileRoute = usersProfileRoute;