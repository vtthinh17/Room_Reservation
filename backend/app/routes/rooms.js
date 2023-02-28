import express from "express";
import Room from "../models/Room.js"
const router = express.Router();
// Get
router.get("/:id",async (req,res)=>{
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json(error)
    }
})
// Get All
router.get("/",async (req,res)=>{
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (error) {
        res.status(500).json(error)
    }
})
// create
router.post("/", async (req,res)=>{
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        res.status(200).json(savedRoom)
    } catch (error) {
        res.status(500).json(error)
    }
})
// update
router.put("/:id", async (req,res)=>{
    // const newRoom = new Room(req.body)
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set: req.body},{upsert:true})
        res.status(200).json(updatedRoom)
    } catch (error) {
        res.status(500).json(error)
    }
})
// delete
router.delete("/:id", async (req,res)=>{
    // const newRoom = new Room(req.body)
    try {
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json("Room has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})


export default router;