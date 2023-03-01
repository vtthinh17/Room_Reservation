import express from "express";
import {createRoom,updateRoom,deleteRoom,getRoom,getRooms} from '../controllers/room.js';
const router = express.Router();
// GET
router.get("/:id", getRoom);
// GET All
router.get("/", getRooms);
//CREATE
router.post("/", createRoom);
// Update
router.put("/:id",updateRoom)
// Delete
router.delete("/:id",deleteRoom)
export default router;