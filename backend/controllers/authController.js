const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  registerUser: async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already exists" });
      }
      console.log(req.body.email,req.body.password)
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      
      const newUser = await new User({
        email: req.body.email,
        password: hashed,
        balance: 100000, 
      });

      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      'JWT_ACCESS_KEY',
      { expiresIn: "300s" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      'JWT_REFRESH_KEY',
      { expiresIn: "365d" }
    );
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("Incorrect email");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Incorrect password");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, 'JWT_REFRESH_KEY', (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  logOut: async (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    return res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;
