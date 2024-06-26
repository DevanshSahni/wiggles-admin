const ProfileModel = require("../models/Profile");
const UserModel = require("../models/Users");

module.exports.setViolation = async (req, res) => {
  const { userID, popupAction, message, reason } = req.body;
  if (popupAction == "ban") {
    await UserModel.updateOne({ _id: userID }, { banned: true });
    res.status(200).json({ message: `User has been banned` });
  } else {
    const user = await ProfileModel.findOne(
      { _id: userID },
      { _id: 0, violations: 1 }
    );
    const violation = user.violations;

    let newViolation = {
      warn: true,
      warnings: violation ? violation.warnings + 1 : 1,
      violationMessage: message,
      lastWarned: Date.now(),
    };

    await ProfileModel.updateOne({ _id: userID }, { violations: newViolation });

    res.status(200).json({ message: `User has been warned` });
  }
};
