import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        customerName: {type:String , required: true,trim:true},
        customerEmail: {type:String , required: true,unique: true, trim:true},
        customerPassword :{type:String , required: true,trim:true},
        customerPhone: {type: String,required: true,},
        verifyotp:{type:String, default:''},
        verifyotpExpireAt:{type:Number, default:0},
        resetotp:{type:String, default:''},
        resetotpExpireAt:{type:Number, default:0},
        role: {type: String,enum: ['customer', 'worker'],default: 'customer',
            
        },
    },
    { timestamps: true }
)

const Customer=mongoose.model("Customer",customerSchema);

export default Customer;