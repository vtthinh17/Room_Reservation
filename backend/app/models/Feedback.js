import mongoose from "mongoose";
const FeedbackSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        content: {type: String, required: true},        
        isDisplay: {type: Boolean, default: false},
        rating:{type: Number},
        writingAt: {type: String}
    }
);

export default mongoose.model("Feedback", FeedbackSchema);
