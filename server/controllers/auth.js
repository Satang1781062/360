const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User Already exists");
    }

    // Create new user
    const salt = await bcrypt.genSalt(10);
    user = new User({
      username,
      email,  // Added email field
      password,
    });

    // Hash password
    user.password = await bcrypt.hash(password, salt);

    // Save user to the database
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



// exports.googleLogin = async (req, res) => {
//   const { idToken } = req.body; // Extract idToken from request body

//   if (!idToken) {
//     return res.status(400).json({ error: 'ID token is required' });
//   }

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
//     });

//     const { email, name, picture } = ticket.getPayload();

//     // Check if user already exists in the database
//     let user = await User.findOne({ email });

//     if (!user) {
//       // If user does not exist, create a new user
//       user = new User({ email, name, picture });
//       await user.save();
//     }

//     // Create a JWT token for the user
//     const token = jwt.sign({ user: { email, name } }, "jwtSecret", { expiresIn: '1h' }); // Replace with your JWT generation method

//     res.status(200).json({
//       token,
//       user: {
//         _id: user._id,
//         email: user.email,
//         name: user.name,
//         picture: user.picture,
//       },
//     });
//   } catch (error) {
//     console.error('Error while verifying Google token:', error);
//     res.status(400).json({
//       error: 'Google login failed. Try again.',
//     });
//   }
// }

// exports.loginFacebook = async (req, res) => {
//   try {
//     const { UserID, name, email } = req.body;
//     var data = {
//       name: UserID,
//       username: name
//     }
//   }
// }

exports.loginFacebook = async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
    const profile = await response.json();

    const { id, name, email } = profile;

    // Find or create a user based on the Facebook profile
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, username: name, facebookId: id });
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user });
  } catch (error) {
    console.error('Error logging in with Facebook:', error);
    res.status(500).send('Facebook login failed');
  }
};



// Google Login
exports.loginGoogle = async (req, res) => {
  const { token, username, email, picture } = req.body;

  try {
    // ตรวจสอบว่า user มีอยู่ในฐานข้อมูลหรือไม่
    let user = await User.findOne({ email });

    // ถ้าไม่มี user ในฐานข้อมูล ให้สร้างใหม่
    if (!user) {
      user = new User({
        username,
        email,
        role: "user", // หรือกำหนด role ตามที่คุณต้องการ
        address: {
          email,
        },
      });
      await user.save();
    }

    // Generate a JWT token with username and role in the payload
    const jwtToken = jwt.sign(
      {
        user: {
          username: user.username,
          role: user.role,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error('Error logging in with Google:', error);
    res.status(500).send('Google login failed');
  }
};
