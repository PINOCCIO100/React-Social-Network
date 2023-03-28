const Follows = require('../models/Follows.js');


exports.getFollowStatus = async (req, res) => {
  const userID = Number(req.params.userID);
  const followsExists = Boolean(await Follows.exists({
    follower: req.session.id,
    followed: userID
  }));
  res.send(followsExists);
}

exports.followUser = async (req, res) => {
  const follower = Number(req.session.id);
  const followed = Number(req.params.userID);
  try {
    // Нельзя подписаться на самого себя
    if (follower === followed) {
      throw new Error(`You can't follow/unfollow yourself `)
    } else {
      const followsDoc = await Follows.findOne({ follower, followed });
      if (!followsDoc) {
        await Follows.create({ follower, followed })
        res.json({
          resultCode: 0,
          message: []
        })
      } else { throw new Error(`This user not followed`) }
    }
  } catch (e) {
    console.log(e.message);
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}

exports.unfollowUser = async (req, res) => {
  const follower = Number(req.session.id);
  const followed = Number(req.params.userID);
  try {
    if (follower === followed) {
      throw new Error(`You can't follow/unfollow yourself `)
    } else {
      const follow = await Follows.findOneAndDelete({ follower, followed });
      if (!follow) {
        throw new Error(`This user not followed`)
      } else {
        res.json({
          resultCode: 0,
          message: []
        })
      }
    }
  } catch (e) {
    console.log(e.message);
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}
