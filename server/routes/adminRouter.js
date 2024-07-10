const express = require("express");
const router = express.Router();
const {
  adminLogin,
  userDetails,
  editUser,
  deleteUser,
} = require("../controller/adminController");
const authorization = require("../middleware/adminAuth");
const upload = require("../multer/multer");

router.post("/login", adminLogin);
router.get("/users", authorization, userDetails);
router.put(
  "/edit-user/:userId",
  upload.single("profileImage"),
  authorization,
  editUser
);
router.delete("/delete-user/:userId", authorization, deleteUser);

module.exports = router;
