const User = require("../db/models/user.model");

module.exports.addUser = async (req, res) => {
  try {
    console.log(req.body);
    await User.create(req.body);
    res.status(200).json({
      success: true,
      message: "Added successfully"
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports.listUser = async (req, res) => {
  try {
    console.log(req.query);
    const users = await User.findAndCountAll();
    res.status(200).json({
      success: true,
      message: "User list fetch successfully",
      data: users
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};