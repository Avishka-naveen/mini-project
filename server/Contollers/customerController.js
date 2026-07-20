import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomerModel from '../DB_Models/CustomerModel.js';

//--------------user registration controller------------//

export const register = async (req, res) => {

    const { customerName, customerEmail, customerPassword, customerPhone } = req.body;


    if (!customerName || !customerEmail || !customerPassword || !customerPhone) {
        return res.json({ success: false, message: "Missing Details" });
    }

    try {

        const existingUser = await CustomerModel.findOne({ customerEmail });

        if (existingUser) {
            return res.json({ success: false, message: "User Already Exists using this email" });
        }


        const hashedPassword = await bcrypt.hash(customerPassword, 10);


        const newCustomer = new CustomerModel({
            customerName,
            customerEmail,
            customerPassword: hashedPassword,
            customerPhone
        });

        await newCustomer.save();


        const token = jwt.sign({ id: newCustomer._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.json({
            success: true,
            message: 'Registered Successfully',
            customer: newCustomer,
            token
        });

    } catch (error) {

        res.json({ success: false, message: 'Error in Registering User', error: error.message });
    }
}

//--------------user loging controller------------//

export const login = async (req, res) => {

    const { customerEmail, customerPassword } = req.body;
    if (!customerEmail || !customerPassword) {
        return res.json({ success: false, massage: 'email and password is requied' })

    }

    try {
        const customer = await CustomerModel.findOne({ customerEmail });

        if (!customer) {
            return res.json({ success: false, message: "Invalied Email!" });
        }

        const isMatch = await bcrypt.compare(customerPassword, customer.customerPassword);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalied Password !" });

        }

        const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.json({
            success: true,
            message: 'Login Successfully !',


        });
        //  console.log(token);


    } catch (error) {
        return res.json({ success: false, massage: error.massage });
    }
}

//----------------get current customer data--------------//

export const getCurrentCustomerData=async(req,res)=>{
    const customerId=req.customerId;

    try {
        const customer=await CustomerModel.findById(customerId).select('customerName  customerEmail customerPhone');
        if(!customer){
             return res.json({success:false,message:"no user found"});
        }
        return res.json({success:true,message:'user Found',customer});
    } catch (error) {
        return res.json({success:false,message:error.massage});
    }

}

export const logout=async(req,res)=>{
       try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*60*1000

        });
        return res.json({success:true,massage:'logged out successfully'});
        
    } catch (error) {
        return res.json({success:false,massage:error.massage});
        
    }

}