import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipient: {type: mongoose.Schema.Types.ObjectId,ref: "Customer",required: true},
    sender: {type: mongoose.Schema.Types.ObjectId,ref: "Customer"},
    senderRole: {type: String,enum: ["customer", "worker"]},
    recipientRole: {type: String,enum: ["customer", "worker"]},
    type: {type: String,enum: ["comment", "reply", "job", "application", "message", "reservation"]},
    message: {type: String,required: true},
    relatedId: {type: mongoose.Schema.Types.ObjectId},
    isRead: {type: Boolean,default: false}

}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;