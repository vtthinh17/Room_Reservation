import mongoose from "mongoose";

    const FeedbackSchema = new mongoose.Schema(
        {
            userId: {type: String, required: true},
            content: {type: String, required: true},        
            isDisplay: {type: Boolean, default: false},
            rating:{type: Number,required: true},
            writingAt: {type: String, required: true}
        }
    );

export default mongoose.model("Feedback", FeedbackSchema);
