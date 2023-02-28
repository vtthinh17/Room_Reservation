import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    number: { type: Number, require: true},
    price: { type: Number, require: true},
    type: { type: String, require: true},
    description: {type: [String], require: true},
    status: { type: Number, require: true},
    startServe: { type: Date},
    endServe: { type: Date},
    image: { type: String, require: true},
    });

export default mongoose.model("Room",RoomSchema)