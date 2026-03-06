const { sendOTP, checkOTP } = require("../Middleware/auth.middleware");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const User =require('../Modal/auth.Schema')
// Send OTP
exports.register = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

 
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

  
    let user = await User.findOne({ phone });

    if (!user) {
     
      user = new User({
        name,
        email,
        phone,
      });
    } else {
    
      user.name = name;
      user.email = email;
    }

    await user.save();
     const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = await sendOTP(phone);

    res.json({
      success: true,
      message: "User saved & OTP sent",
      status: response.status,
      user,
       token,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, code } = req.body;

    const response = await checkOTP(phone, code);

    if (response.status === "approved") {
      // ✅ Update user verified
      const user = await User.findOneAndUpdate(
        { phone },
        { isVerified: true },
        { new: true }
      );

      return res.json({
        success: true,
        message: "OTP Verified",
        user,
      });
    }

    res.json({
      success: false,
      message: "Invalid OTP",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};