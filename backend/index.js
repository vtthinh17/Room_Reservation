import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roomsRoute from "./app/routes/rooms.js";
const app = express();
dotenv.config();

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected to DB success')
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares
app.use(express.json());

app.use("/api/rooms", roomsRoute);

app.listen(8000,()=>{
    connect()
    console.log("Backend running on port 8000...")
})