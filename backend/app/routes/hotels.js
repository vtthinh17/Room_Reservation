import express from "express";

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hotels homepage endpoint")
})


export default router;