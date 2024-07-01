const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User Already exists");
    }
    const salt = await bcrypt.genSalt(10);
    user = new User({
      username,
      password,
    });
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOneAndUpdate({ username }, { new: true });
    if (user && user.enabled) {
      // Check Password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!");
      }
      // Payload
      const payload = {
        user: {
          username: user.username,
          role: user.role,
        },
      };
      // Generate Token
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User Not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// Current User
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).select('-password').exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// List User
exports.listUser = async (req, res) => {
  try {
    res.send("list Get User");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// Edit User
exports.editUser = async (req, res) => {
  try {
    res.send("Edit User");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    res.send("remove User");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// Google Login
// Google Login
exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;
  
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email } = ticket.getPayload();

    if (email_verified) {
      let user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, user });
      } else {
        const password = email + process.env.JWT_SECRET;
        user = new User({ username: name, email, password });
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, user });
      }
    } else {
      res.status(400).json({ error: 'Google login failed. Try again.' });
    }
  } catch (error) {
    console.error('Google login error:', error);
    res.status(400).json({ error: 'Google login failed. Try again.' });
  }
};

