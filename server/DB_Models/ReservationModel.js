import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customerId: {type: mongoose.Schema.Types.ObjectId,ref: "Customer",required: true,},
    serviceId: {type: mongoose.Schema.Types.ObjectId,ref: "Service",required: true,},
    customerAddress: {type: String,required: true,trim: true,},
    date: {type: Date,required: true,},
    description: {type: String,required: true,trim: true,},
    status: {type: String,enum: ["pending", "complete"],default: "pending",},
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;