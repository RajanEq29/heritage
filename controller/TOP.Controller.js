const { sendOTP, checkOTP } = require("../Middleware/auth.middleware");

const User =require('../Modal/auth.Schema')
// Send OTP
exports.register = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // ✅ Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Check if user already exists
    let user = await User.findOne({ phone });

    if (!user) {
      // ✅ Create new user
      user = new User({
        name,
        email,
        phone,
      });
    } else {
      // ✅ Update existing user
      user.name = name;
      user.email = email;
    }

    await user.save();

    // 📲 Send OTP via Twilio
    const response = await sendOTP(phone);

    res.json({
      success: true,
      message: "User saved & OTP sent",
      status: response.status,
      user,
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