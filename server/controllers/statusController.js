const Status = require("../models/Status");
const UserInfo = require("../models/UserInfo");

exports.getUserStatus = async (req, res) => {
  const { userID } = req.params;
  res.send(`get for ${userID}`)
}

exports.createUserStatus = async (req, res) => {
  try {
    const userID = req.session.id;
    const { text } = req.body;
    const currStatus = await UserInfo.findOne({ id: userID }).populate('status');
    if (currStatus?.status.body !== text) {
      if (text !== '' && text !== undefined) {
        const status = await Status.create({
          id: userID,
          body: text,
          date: Date.now(),
        });
        await UserInfo.updateOne({ id: userID }, { $set: { status } })
      } else {
        await UserInfo.updateOne({ id: userID }, { $set: { status: null } })
      }
    }
    res.json({
      resultCode: 0,
      data: {},
      message: [],
    })
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message],
    })
  }
}