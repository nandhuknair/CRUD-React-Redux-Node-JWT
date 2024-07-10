const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/userModel");

exports.signUp = async (req, res) => {
  try {
    const { userName, email, mobile, password } = req.body;
    const profileImage = req.file;
    if (!profileImage)
      return res.status(400).json({ message: "Profile is not uploaded" });

    const profileImagePath = `/uploads/${profileImage.filename}`;
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
      imagePath: profileImagePath,
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

exports.login = async (req, res) => {
  console.log("Here its reached near the login page !");
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ message: "You are not yet registered please Signup" });
    }

    const passwordCheck = await bcrypt.compare(password, userExist.password);
    if (!passwordCheck) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const userDetails = {
      name: userExist.userName,
      email: userExist.email,
      mobile: userExist.mobile,
      isAdmin: userExist.isAdmin,
      image: userExist.imagePath,
      createdAt: userExist.createdAt,
    };

    const token = jwt.sign(userDetails, process.env.JWT_SECRET);

    res.status(200).json({
      message: "Successfully logged In",
      token: token,
      user: userExist,
    });
  } catch (error) {
    console.log("error in the signin LOGIN pos ", error);
    res
      .status(500)
      .json({ message: "Login failed server failed", error: error });
  }
};

exports.home = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res.status(400).json({ message: "No token exist please login" });
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        console.log("error in token varification", err);
        res
          .status(500)
          .json({ message: "error in token verification", error: err });
      } else {
        if (data.isAdmin)
          return res.status(400).json({
            message: "It's an admin token not user's please try another email",
          });
        const userData = await User.findOne({ email: data.email });
        res
          .status(200)
          .json({ message: "Successfully verified the token", user: userData });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error during verification of token",
      error: error,
    });
  }
};


