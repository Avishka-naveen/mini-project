import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true, },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "reviewing", "resolved", "rejected"], default: "pending" }

}, { timestamps: true });

const ReportModel = mongoose.model("Report", reportSchema);

export default ReportModel;