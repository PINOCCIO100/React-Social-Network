const { Router } = require("express");
const { ratePost, votesPost, myVotePost } = require("../controllers/ratingController");

const ratingRoute = Router();

ratingRoute.post('/', ratePost);

ratingRoute.post('/votes', votesPost);

ratingRoute.post('/votes/my', myVotePost);

exports.ratingRoute = ratingRoute;