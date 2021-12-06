const auth = require("../auth");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

getLoggedIn = async (req, res) => {
  auth.verify(req, res, async function () {
    const loggedInUser = await User.findOne({ _id: req.userId });
    return res
      .status(200)
      .json({
        loggedIn: true,
        user: {
          userName: loggedInUser.userName,
          email: loggedInUser.email,
        },
      })
      .send();
  });
};

loginUser = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ errorMessage: "Please enter all required fields" });
  }
  const existingUser = await User.findOne({ userName: userName });

  if (!existingUser) {
    return res.status(400).json({ errorMessage: "No Account With That Email" });
  }

  if (existingUser) {
    const compare = await bcrypt.compare(password, existingUser.passwordHash);
    if (compare) {
      const newUser = new User(existingUser);
      const savedUser = await newUser.save();
      const token = auth.signToken(savedUser);
      await res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json({
          loggedIn: true,
          user: {
            userName: existingUser.userName,
            email: existingUser.email,
          },
        });
    } else {
      return res.status(400).send({ errorMessage: "Wrong Password" });
    }
  }
};

registerUser = async (req, res) => {
  try {
    const { userName, email, password, passwordVerify } = req.body;

    if (!userName || !email || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    const existingUsername = await User.findOne({ userName: userName });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        errorMessage: "An account with this Username already exists.",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 8 characters.",
      });
    }
    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errorMessage: "An account with this email address already exists.",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();

    // LOGIN THE USER
    const token = auth.signToken(savedUser);
    await res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          userName: savedUser.userName,
          email: savedUser.email,
        },
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

logoutUser = async (req, res) => {
  //res.clearCookie('token').send()
  res.cookie("token", "", { maxAge: 1 }).status(200).send();
};

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
};
