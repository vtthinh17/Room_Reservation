import express from "express"
// import cac middleware de check token & check quyen` nguoi dung
import { verifyToken,verifyUser,verifyAdmin } from "../utils/verifyToken.js";
// sau khi xu ly qua cac middleware se goi cac function trong controllers de xu ly
import {updateUser,deleteUser,getUser,getUsers} from '../controllers/user.js';
const router = express.Router();

router.get("/checkauthentication", verifyToken,(req,res)=>{
    res.send("Verify token success, you are logged in")
})
router.get("/checkuser/:id", verifyUser, (req,res) => {
    res.send("Hello, check success, you are an user")
})
router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
    res.send("Hello, check success, you are a admin")
})
// GET
router.get("/:id",verifyUser, getUser);
// GET All
router.get("/",verifyAdmin, getUsers);
// Update
router.put("/update/:id",verifyUser, updateUser)
// Delete
router.delete("/:id",verifyAdmin,deleteUser)


export default router