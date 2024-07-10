const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const adminExist = await User.findOne({ email: email, isAdmin: true });
    if (!adminExist)
      return res
        .status(400)
        .json({ message: "You are not admin please login as User" });
    const passwordCheck = await bcrypt.compare(password, adminExist.password);
    if (!passwordCheck) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const adminDetails = {
      isAdmin: adminExist.isAdmin,
      id: adminExist.id,
      email: adminExist.email,
    };

    const token = jwt.sign(adminDetails, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "Successfully logged In",
      token: token,
      admin: adminExist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error !", error: error });
  }
};

exports.userDetails = async (req, res) => {
  try {
    const adminData = await User.findOne({
      email: req.email,
      isAdmin: true,
    });

    if (!adminData)
      return res.status(400).json({ message: "You are not an admin" });

    const userData = await User.find({ isAdmin: false });

    res.status(200).json({
      message: "Successfully vereified the token",
      adminData: adminData,
      userData: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error !", error: error });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { userName, email, mobile } = req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user)
      return res.status(400).json({
        message: "user is is not valid or user not found at the way !",
      });

    user.name = userName;
    user.email = email;
    user.mobile = mobile;

    if(req.file){
      user.imagePath = `/uploads/${req.file.filename}`;
    }

    await user.save()

    res.status(200).json({message:"Successfully edited the user", user})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await User.findByIdAndDelete(userId);
    if (!user)
      return res.status(404).json({ message: "Error while deleting the user" });
    return res.status(200).json({ message: "Successfully deleted the user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
