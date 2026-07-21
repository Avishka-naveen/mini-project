import express from 'express'
import { getCurrentCustomerData, login, logout, register, sendForgotPwOtp, verifyForgotPWOtp } from '../Contollers/customerController.js';
import userAuth from '../middleWare/userAuth.js';

const customerRoute= express.Router();

customerRoute.post('/register',register);
customerRoute.post('/login',login);
customerRoute.get('/currentCustomerData',userAuth,getCurrentCustomerData);
customerRoute.post('/logout',logout);
customerRoute.post('/sendPwResetOtp',sendForgotPwOtp);
customerRoute.post('/verifyForgotPWOtp',verifyForgotPWOtp)

export default customerRoute;