const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/signup", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),

  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    console.log(req);
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong Password or Username !");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const orignalPassword = bytes.toString(CryptoJS.enc.Utf8);

    orignalPassword !== req.body.password &&
      res.status(401).json("Wrong Password or Username !");

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
