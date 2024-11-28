const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.googleLogin = async (req, res) => {
  console.log("Google User Data:", req.user);
  const { id, email, name } = req.user;
  try {
    let user = await User.findOne({
      $or: [
        { email: email },
        { googleId: id }
      ]
    });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: id,
        isVerified: true
      });
    } else {
      if (!user.googleId) {
        user.googleId = id;
        await user.save();
      }
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Instead of redirecting with query params, redirect to a page 
    // that will handle setting localStorage
    res.redirect(`http://localhost:3000/auth/callback?token=${token}&name=${encodeURIComponent(name)}`);


  } catch (error) {
    console.error("Google Login Error:", error);
    
    if (error.code === 11000) {
      return res.redirect(`http://localhost:3000/login?error=duplicate_user`);
    }

    res.redirect(`http://localhost:3000/login?error=login_failed`);
  }
};

