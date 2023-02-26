const Posts = require("../models/Posts");
const Rating = require("../models/Rating");


exports.getAllMyPosts = async (req, res) => {
  try {
    const posts = await Posts.find({ accepterID: req.session.id }, { __v: 0 });
    res.json(posts)
  } catch (e) {
    console.log(e.message);
  }
}

exports.getAllUserPosts = async (req, res) => {
  try {
    const posts = await Posts.find({ accepterID: req.params.userID }, { __v: 0 });
    res.json(posts)
  } catch (e) {
    console.log(e.message);
  }
}

exports.getAllMyPostedPosts = async (req, res) => {
}

exports.postPost = async (req, res) => {
  const senderID = req.session.id
  const { accepterID, post } = req.body;
  try {
    const postBody = await Posts.create({
      senderID,
      accepterID,
      post,
      rating: {
        likes: 0,
        dislikes: 0
      },
      postDate: Date.now(),
    });
    res.json({
      resultCode: 0,
      data: postBody,
      message: [],
    })
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}

