import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true, unique: true, },
        comment: { type: String, default: "", trim: true, },
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true, unique: true, },

    },
    { timestamps: true }
)

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;