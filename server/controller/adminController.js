const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  try {
    const { userName, passwrod } = req.body;
    console.log(
      userName,
      passwrod,
      "this is the username and the password of the admin if it reach here"
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error !", error: error });
  }
};

exports.adminDashBoard = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error !", error: error });
  }
};
