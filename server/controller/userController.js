const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/userModel");

exports.login = async (req, res) => {
  try {
    console.log("Hello it's success babyyyy!");
    res.json("SUccess");
  } catch (error) {
    res.json({ message: error });
    console.log(error);
  }
};

exports.signUp = async (req, res) => {
  try {
    const { userName, email, mobile, password } = req.body;
    const profileImage = req.file;
    if (!profileImage)
      return res.status(400).json({ message: "Profile is not uploaded" });
     
    const profileImagePath = profileImage.path;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exist please Login" });

    const salt = await bcrypt.genSalt();     
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: userName,
      email: email,
      mobile: mobile,
      password: hashedPassword,
      imagePath:profileImagePath,
    });

    await newUser.save();

    res.status(200).json({ message: "Registered Successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
};
