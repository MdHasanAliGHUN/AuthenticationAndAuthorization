const express = require("express");
const moment = require("moment");
const User = require("../model/userModel");
const { generateToken } = require("../services/tokenService");
const {
  checkAuthentication,
} = require("../middlewares/authMiddleware/checkAuthentication");
const {
  checkAuthorization,
} = require("../middlewares/authMiddleware/checkAuthorization");
const {
  getAdminContent,
  getUserProfile,
  loginUser,
  registerUser,
} = require("../controllers/userController");
const userRouter = express.Router();

// GET /users/
userRouter.get("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "I AM FROM USER ROUTER",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Register User Route
userRouter.post("/register", registerUser);

//Login User Route
userRouter.post("/login", loginUser);

//Get User Profile Route
userRouter.get("/profile", checkAuthentication, getUserProfile);

// Admin Route
userRouter.get(
  "/admin",
  checkAuthentication,
  checkAuthorization,
  getAdminContent
);

module.exports = userRouter;
