import "dotenv/config";
import express from "express";
import User from "../models/userModel.js";
import md5 from "md5";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = md5(password);

  const foundUser = await User.findOne({ email });
  console.log(foundUser);

  if (!foundUser) {
    return res.status(404).json({
      message: "Invalid Credentials",
    });
  }

  if (foundUser.passwordHash !== passwordHash) {
    return res.status(403).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(foundUser.toObject(), process.env.SECRET);


  res.status(201).json({
    user: foundUser,
    token: token,
  });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.find({ email });

  if (foundUser.length > 0) {
    return res.status(409).json({
      message: "Email already in use",
    });
  }

  const newUser = User({
    email,
    passwordHash: md5(password),
  });

  await newUser.save();

  const token = jwt.sign(newUser.toObject(), process.env.SECRET);

  res.status(201).json({
    user: newUser,
    token: token,
  });
});

export default router;
