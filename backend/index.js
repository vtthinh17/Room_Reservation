import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import roomsRoute from "./app/routes/rooms.js";
import authRoute from "./app/routes/auth.js";
import usersRoute from "./app/routes/users.js";
import feedbacksRoute from "./app/routes/feedbacks.js";
import cookieParser from "cookie-parser";
import cors from "cors";
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
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/feedbacks", feedbacksRoute);
app.listen(8000,()=>{
    connect()
    console.log("BackendServer is running at URL: http://localhost:8000/api")
})