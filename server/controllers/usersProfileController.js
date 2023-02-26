const UserInfo = require('../models/UserInfo');

exports.getUsersList = async (req, res) => {
  try {
    const page = req.query.page;
    const count = req.query.count;
    const usersInfo = await UserInfo.find().sort({ id: -1 }).skip((page - 1) * count).limit(count);
    res.json({
      usersList: usersInfo.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        website: user.website,
        address: user.address,
      })),
      totalCount: await UserInfo.count(),
    });
  } catch (e) {
    console.log(e.message);
    res.status(450).send(e.message);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    res.json(await UserInfo.findOne({ id: req.params.userID }, { __v: 0, _id: 0 }).populate('status'))
  } catch (e) {
    console.log(e.message);
    res.status(450).send(e.message);
  }
}
