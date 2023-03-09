import User from "../models/User.js";

export const updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id,{ $set: req.body },
      );
      res.status(200).json(updatedUser);
      console.log('>>Update user success')
    } catch (err) {
      next(err);
    }
  };

  export const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
      console.log('>>User has been deleted!')
      } catch (err) {
        next(err);
      }

  };
  export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
      console.log('>> Get user '+user.userName+ ' success!')
    } catch (err) {
      next(err);
    }
  };
  export const getUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
      console.log('>> Get all users success!')
    } catch (err) {
      next(err);
    }
  };