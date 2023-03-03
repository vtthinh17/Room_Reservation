import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateError } from "../utils/generateErr.js";
export const register = async (req, res,next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.passWord, salt);
        const newUser = new User({
            userName: req.body.userName,
            email:req.body.email,
            passWord: hash
        })
        await newUser.save()
        res.status(200).send("User has been created");
        console.log(">>New user: " + newUser.userName + " has been added to database!")
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res,next) => {
    try {
    //    find and check is exist userName on database
        const user = await User.findOne({userName:req.body.userName})
        if(!user) 
            return next(generateError(404,"User not found!"))
    // if matched userName, then check password
    // so sanh password gui tu request voi password cua "user" tim duoc o line 23
        const isPasswordCorrect = await bcrypt.compare(req.body.passWord,user.passWord)
        if(!isPasswordCorrect) 
            return next(generateError(400,"Password is incorrect!"))
        res.status(200).json(user);
        console.log("User founded >> :",req.body.userName)
    } catch (error) {
        next(error);
    }
}

