import express from "express";
import {createRoom,updateRoom,deleteRoom,getRoom,getRooms,getRoomByQuery,addDateServe,removeDateServe,removeService,addNewService} from '../controllers/room.js';
import { verifyUser,verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
// GET
router.get("/find/:id",verifyUser, getRoom);
router.get("/getRoomByQuery", getRoomByQuery);
// GET All
router.get("/", getRooms);
// router.get("/",verifyAdmin, getRooms);
//CREATE
router.post("/create",verifyAdmin, createRoom);
// Update
router.put("/update/:id",verifyAdmin, updateRoom)
// AddDateServe
router.put("/addDateServe/:id",verifyUser, addDateServe)
router.put("/addNewService/:id",verifyAdmin, addNewService)
router.put("/removeDateServe/:id",verifyUser, removeDateServe)
router.put("/removeService/:id",verifyAdmin, removeService)
// Delete
router.delete("/delete/:id",verifyAdmin, deleteRoom)


export default router;