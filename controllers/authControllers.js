const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res) => {
  let { loggedInUserId } = req.body;
  try {
    let loggedInUserRole = await User.findById(loggedInUserId);
    res.json({ role: loggedInUserRole.userRole });
  } catch {
    res.status(404).json({ error: "User not found" });
  }
};

const registerUser = async (req, res) => {
  let { name, email, password, address, phoneNumber } = req.body;
  let error = {};
  const userImage = `https://ui-avatars.com/api/?background=random&name=${name}`;

  if (!name || !email || !password) {
    error = {
      ...error,
      name: "Field must not be empty",
      email: "Field must not be empty",
      password: "Field must not be empty",
    };
    res.status(400).json({ error });
    return;
  }

  if (name.length < 3 || name.length > 25) {
    error = { ...error, name: "Name must be 3-25 characters" };
    res.status(400).json({ error });
    return;
  }

  if (!validateEmail(email)) {
    error = {
      ...error,
      email: "Email is not valid",
    };
    res.status(400).json({ error });
    return;
  }

  if (password.length < 8 || password.length > 255) {
    error = {
      ...error,
      password: "Password must be 8 characters",
    };
    res.status(400).json({ error });
    return;
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      error = {
        ...error,
        email: "Email already exists",
      };
      res.status(400).json({ error });
      return;
    }

    const newUser = new User({
      name: toTitleCase(name),
      email,
      password: hashedPassword,
      userImage,
      address,
      phoneNumber,
      userRole: 1, // Field Name change to userRole from role
    });

    await newUser.save();
    res.json({ success: "Account created successfully. Please login" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

/* User Login/Signin controllers  */
const loginUser = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: "Fields must not be empty" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const token = await user.getSignedJwtToken();
    const payload = {
      email: user.email,
      role: user.userRole,
    };

    res.json({
      statusCode: 200,
      data: payload,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  isAdmin,
  registerUser,
  loginUser,
};
