import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true, unique: true, },

        profile: { type: String, default: "", trim: true, },
        address: { type: String, required: true, trim: true, },
        description: { type: String, default: "", trim: true, },
        nic: { type: String, default: "", trim: true, },
    },
    { timestamps: true }
);

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;