import express from "express";
import {createFeedback,updateFeedback,deleteFeedback,getFeedback,getFeedbacks,getAllFeedbacks} from '../controllers/feedback.js';
import { verifyUser,verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
// GET
router.get("/find/:id",verifyAdmin, getFeedback);
// GET display
router.get("/", getFeedbacks);
// GET All
router.get("/getAll",verifyAdmin, getAllFeedbacks);
router.post("/",verifyUser, createFeedback);
// Update
router.put("/update/:id",verifyAdmin, updateFeedback)
// Delete
router.delete("/delete/:id",verifyAdmin, deleteFeedback)


export default router;