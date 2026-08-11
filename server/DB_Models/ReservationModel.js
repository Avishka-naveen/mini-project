import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customerId: {type: mongoose.Schema.Types.ObjectId,ref: "Customer",required: true,},
    serviceId: {type: mongoose.Schema.Types.ObjectId,ref: "Service",required: true,},
    workerId: {type: mongoose.Schema.Types.ObjectId,ref: "Worker",required: true,},
    customerName: {type: String,required: true,trim: true,},
    customerEmail: {type: String,required: true,trim: true,},
    customerPhone: {type: String,required: true,trim: true,},
    customerAddress: {type: String,required: true,trim: true,},
    date: {type: Date,required: true,},
    description: {type: String,required: true,trim: true,},
    status: {type: String,enum: ["pending", "completed","confirmed","rejected"],default: "pending",},
    isComment:{type:Boolean,default:false},
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;