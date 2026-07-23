import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomerModel from '../DB_Models/CustomerModel.js';
import transporter from '../config/nodeMail.js';
import { callresetPwTemplate } from '../EmailTemplate/resetPasswordOtp.js';
import { workerRegistrationTemplate } from '../EmailTemplate/becomWorker.js';

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

export const getCurrentCustomerData = async (req, res) => {
    const customerId = req.customerId;

    try {
        const customer = await CustomerModel.findById(customerId).select('customerName  customerEmail customerPhone');
        if (!customer) {
            return res.json({ success: false, message: "no user found" });
        }
        return res.json({ success: true, message: 'user Found', customer });
    } catch (error) {
        return res.json({ success: false, message: error.massage });
    }

}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000

        });
        return res.json({ success: true, massage: 'logged out successfully' });

    } catch (error) {
        return res.json({ success: false, massage: error.massage });

    }

}
//----------------send forgot password otp--------------//

export const sendForgotPwOtp = async (req, res) => {

    const { customerEmail } = req.body;

    if (!customerEmail) {
        return res.json({ success: false, message: 'Email required' });
    }

    try {

        const customer = await CustomerModel.findOne({ customerEmail });

        if (!customer) {
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        customer.resetotp = otp;
        customer.resetotpExpireAt = Date.now() + 10 * 60 * 1000;
        await customer.save();

        // call email template function
        const emailTemplate = callresetPwTemplate(otp, customer.customerName);

        //send mail
        await transporter.sendMail({
            from: "Quick Hire Support",
            to: customer.customerEmail,
            subject: 'Password Reset OTP',
            html: emailTemplate
        });


        return res.json({ success: true, message: 'OTP sent to your email' });

    } catch (error) {

        return res.json({ success: false, message: error.message });
    }
}

//------------verify forgot password otp------------------//
export const verifyForgotPWOtp = async (req, res) => {

    const { resetotp, customerEmail } = req.body;


    if (!resetotp || !customerEmail) {
        return res.json({ success: false, message: 'Missing Details' });
    }
    try {
        const customer = await CustomerModel.findOne({ customerEmail });
        if (!customer) {
            return res.json({ success: false, message: 'no user found' });
        }

        if (customer.resetotpExpireAt < Date.now()) {
            return res.json({ success: false, massage: ' otp expired' });
        }
        if (customer.resetotp === resetotp) {
            return res.json({ success: true, message: 'verify success!' });
            customer.resetotpExpireAt = 0;
            customer.resetotp = '';
            await customer.save();
        } else {
            return res.json({ success: false, message: 'wrong otp please check again!' });
        }


    } catch (error) {
        return res.json({ success: false, massage: error.message });
    }
}

//------------add new password ------------------//

export const addNewPassword = async (req, res) => {

    const { customerEmail, customerPassword } = req.body;
    if (!customerEmail || !customerPassword) {
        return res.json({ success: false, message: "Missing Details!" })
    }

    try {
        const customer = await CustomerModel.findOne({ customerEmail });
        if (!customer) {
            return res.json({ success: false, message: 'user not found' });
        }
        const hashedPassword = await bcrypt.hash(customerPassword, 10);
        customer.customerPassword = hashedPassword;
        await customer.save()
        return res.json({ success: true, message: 'password has been reset successfully ! ' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }


}

//------------customer becomes worker function----------//

export const becomeWorker=async(req,res)=>{
    const customerId = req.customerId;

    try {
        const customer=await CustomerModel.findById(customerId);
        if(!customer){
            return res.json({ success: false, message: "no user found!"});
        }
        const name=customer.customerName;
        
       const otp = String(Math.floor(10000 + Math.random() * 90000));
        customer.verifyotp = otp;
        customer.verifyotpExpireAt = Date.now() + 10 * 60 * 1000;
        await customer.save();

        // call email template function
        const emailTemplate = workerRegistrationTemplate(otp, name);

    
        await transporter.sendMail({
            from: "Quick Hire Support",
            to: customer.customerEmail,
            subject: 'Become Worker!',
            html: emailTemplate
        });


        return res.json({ success: true, message: 'OTP sent to your email' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
        
    }

}

export const verifybecomeWorkerOTP=async(req,res)=>{
    const customerId = req.customerId;
    const {verifyotp } = req.body;

    try {
        const customer=await CustomerModel.findById(customerId);
        if(!customer){
            return res.json({ success: false, message: "no user found!"});
        }
        if (customer.verifyotpExpireAt < Date.now()) {
            return res.json({ success: false, massage: ' otp expired!' });
        }
        if(customer.verifyotp===verifyotp){
            customer.verifyotpExpireAt = 0;
            customer.verifyotp= '';
            await customer.save();
            return res.json({ success: true, message: 'Verify successfull!' });
        }else{
            return res.json({ success: false, message: 'wrong otp please check again!' });
        }
        
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}