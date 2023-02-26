const { Router } = require("express");
const { postPost, getAllMyPostedPosts, getAllMyPosts, getAllUserPosts } = require("../controllers/postsController");

const postsRoute = Router();

postsRoute.get('/my', getAllMyPosts)

postsRoute.get('/posted', getAllMyPostedPosts)

postsRoute.post('/send', postPost)

postsRoute.get('/:userID', getAllUserPosts)

exports.postsRoute = postsRoute;


