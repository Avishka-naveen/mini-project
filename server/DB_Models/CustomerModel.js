import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        customerName: {type:String , required: true,trim:true},
        customerEmail: {type:String , required: true,unique: true, trim:true},
        customerPassword :{type:String , required: true,trim:true},
        customerPhone: {type: String,required: true,}
    },
    { timestamps: true }
)

const Customer=mongoose.model("Customer",customerSchema);

export default Customer;