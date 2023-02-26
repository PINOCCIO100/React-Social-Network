const Follows = require('../models/Follows.js');


exports.getFollowStatus = async (req, res) => {
  const userID = Number(req.params.userID);
  const followsDoc = await Follows.findOne({ id: req.session.id });
  res.send(followsDoc.follows.some(id => id === userID));
}


// TODO: followUser и unfollowUser во многом дублируются. Нужно зарефакторить

exports.followUser = async (req, res) => {
  const userID = Number(req.params.userID);
  try {
    const followsDoc = await Follows.findOne({ id: req.session.id });
    if (!followsDoc.follows.some(id => userID == id)) {
      followsDoc.follows.push(userID);
      followsDoc.save();
      res.json({
        resultCode: 0,
        message: []
      })
    } else {
      res.json({
        resultCode: 1,
        message: [`This user already followed`]
      })
    }
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}

exports.unfollowUser = async (req, res) => {
  const userID = Number(req.params.userID);
  try {
    const followsDoc = await Follows.findOne({ id: req.session.id });
    if (followsDoc.follows.some(id => userID == id)) {
      followsDoc.follows = followsDoc.follows.filter(id => id !== userID);
      followsDoc.save();
      res.json({
        resultCode: 0,
        message: []
      })
    } else {
      res.json({
        resultCode: 1,
        message: [`This user not followed`]
      })
    }
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}