import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/Quick_Hire`);
        console.log('✅ Connected to Local MongoDB Atlas');
    } catch (error) {
        console.log('❌ MongoDB connection error:',error);
    }
}

export default connectDB;