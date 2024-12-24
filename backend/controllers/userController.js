const User = require("../models/User");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("User deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const withdrawAmount = req.body.amount;
      if (withdrawAmount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than 0" });
      }
      if (user.balance < withdrawAmount) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
      user.balance -= withdrawAmount;
      await user.save();
  
      return res.status(200).json({ message: "Withdrawal successful", balance: user.balance });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = userController;
