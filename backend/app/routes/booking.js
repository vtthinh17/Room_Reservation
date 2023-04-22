import express from "express";
import {createBooking,cancelBooking,deleteBooking,deleteBookingOfDeletedRoom,getBooking,getBookings,getBookingByUserID,getBookingByRoomID,updateBooking} from '../controllers/booking.js';
import { verifyUser,verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
// GET
router.get("/find/:id",verifyUser, getBooking);
// router.get("/getBookingByQuery", getBookingByQuery);
// GET All
router.get("/", getBookings);
// GET All Booking of 1 user
router.get("/:id", getBookingByUserID);
// GET All Booking of 1 user
router.get("/roomID/:id", getBookingByRoomID);
// router.get("/",verifyAdmin, getBookings);
//CREATE
router.post("/create",verifyUser, createBooking);
// Update
router.put("/update/:id",verifyAdmin, updateBooking)
router.put("/cancel/:id",verifyUser, cancelBooking)
// Delete
router.delete("/delete/:id",verifyAdmin, deleteBooking)
router.delete("/deleteMany/",verifyAdmin, deleteBookingOfDeletedRoom)


export default router;