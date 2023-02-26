const Rating = require("../models/Rating");

exports.ratePost = async (req, res) => {
  try {
    const userID = req.session.id;
    const { objID, rating, objType } = req.body;
    const ratingDoc = await Rating.findOne({ objID, userID })
    let myRate = rating; // моя оценка
    if (ratingDoc) {
      if (ratingDoc.rating === rating) {
        await Rating.findOneAndRemove({ objID, userID });
        myRate = 0; // признак отсутствия оценки
      } else {
        ratingDoc.rating = rating;
        await ratingDoc.save();
      }
    } else {
      await Rating.create({ objID, userID, rating, objType })
    }
    res.json({
      resultCode: 0,
      data: {
        myRate,
        likes: await Rating.count({ objID, rating: 1 }),
        dislikes: await Rating.count({ objID, rating: -1 }),
      },
      message: [],
    })
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message],
    })
  }
}

exports.myVotePost = async (req, res) => {
  try {
    const { objID } = req.body;
    const myRateDoc = await Rating.findOne({ objID, userID: req.session.id });
    res.json({
      resultCode: 0,
      data: {
        myRate: myRateDoc?.rating ?? 0,
      },
      message: [],
    });

  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message],
    })
  }
}

exports.votesPost = async (req, res) => {
  try {
    const { objID } = req.body;
    const likes = await Rating.count({ objID, rating: 1 });
    const dislikes = await Rating.count({ objID, rating: -1 });
    res.json({
      resultCode: 0,
      data: {
        likes, dislikes
      },
      message: [],
    });

  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message],
    })
  }

}