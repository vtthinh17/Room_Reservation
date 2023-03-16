import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roomsRoute from "./app/routes/rooms.js";
import authRoute from "./app/routes/auth.js";
import usersRoute from "./app/routes/users.js";
import cookieParser from "cookie-parser";
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
app.use(cookieParser())
app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.listen(8000,()=>{
    connect()
    console.log("Backend running on port 8000...")
})