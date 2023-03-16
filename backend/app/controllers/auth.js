import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateError } from "../utils/generateErr.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.passWord, salt);
    const newUser = new User({
      ...req.body,
      passWord: hash
    })
    await newUser.save()
    res.status(200).send("User has been created");
    console.log(">>New user: " + newUser.userName + " has been added to database!")
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) return next(generateError(404, "User not found!"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.passWord,
      user.passWord
    );
    if (!isPasswordCorrect)
      return next(generateError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

