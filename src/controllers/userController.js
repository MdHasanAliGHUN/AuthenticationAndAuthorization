const User = require("../model/userModel");
const moment = require("moment");
const { generateToken } = require("../services/tokenService");

// Create a new user (Register)
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    if (await User.isEmailTaken(email)) {
      return res.status(400).json({
        message: "Email already taken",
      });
    }

    // Create a new user
    const user = await User.create({ name, email, password });

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message,
    });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    //Check credentials
    if (!user || !(await user.isPasswordMatche(password))) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    /////////////////////////////////////////////
    const accessTokenExpires = moment().add(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      "minute"
    );
    //JWT TOKEN GENERATION
    const accessToken = await generateToken(
      user._id,
      user.role,
      accessTokenExpires,
      "access"
    );
    //////////////////////////////////////////////
    res.status(200).json({
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        access: {
          token: accessToken,
          expires: accessTokenExpires.toDate(),
          expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message,
    });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "User profile data",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message,
    });
  }
};

//  Admin-only content
const getAdminContent = async (req, res) => {
  try {
    res.status(200).json({ message: "Admin content accessed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getAdminContent,
};
