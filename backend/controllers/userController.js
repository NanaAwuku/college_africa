const asyncHandler = require("express-async-handler");

// @desc Register new user
// @route POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  res.json({ mess: "register user" });
});

// @desc Login a new user
// @route POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ mess: "login user" });
});

// @desc Get user information
// @route GET /api/users/getMe
// @access  Public
const getMe = asyncHandler(async (req, res) => {
  res.json({ mess: "display user info" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
