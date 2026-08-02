import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    serviceName: {type: String,required: true,trim: true,},
    price: {type: Number,required: true,},
    serviceLocation: {type: String,required: true,trim: true,},
    serviceDescription: {type: String,default: "",trim: true,},
    servicePhone: {type: String,required: true,trim: true,},
    serviceSkill: {type: String,required: true,trim: true,},
    rating: {type: Number,default: 0,min: 0,max: 5,},
    workerId: {type: mongoose.Schema.Types.ObjectId,ref: "Worker",required: true,},
    
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);

export default Service;