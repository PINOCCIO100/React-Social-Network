const { Router } = require("express");
const { getFollowStatus, followUser, unfollowUser } = require("../controllers/followController");

const followRoute = Router();

followRoute.get('/:userID', getFollowStatus);

followRoute.post('/:userID', followUser);

followRoute.delete('/:userID', unfollowUser); 

exports.followRoute = followRoute;
