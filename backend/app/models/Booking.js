import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema(
    {
        roomID: {type: String, required: true,},
        userID: {type: String, required: true,},
        bookingStatus: { type: Number, default: 1,},
        dateServe: {type: Object},
        totalPrice:{type: Number, required:true},
        bookingAt: {type: Date,required:true}
    }
);

export default mongoose.model("Booking", BookingSchema);
