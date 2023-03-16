import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
    {
        roomType: {type: Number, required: true,},
        roomNumber: {type: Number, required: true,},
        description:{type: [String], required: true},
        price: {type: Number, required: true,},
        status: { type: Number, required: true,},
        dateServe: {type: [Date],},
        image:{type: String, required:true},
    }
);

export default mongoose.model("Room", RoomSchema);
