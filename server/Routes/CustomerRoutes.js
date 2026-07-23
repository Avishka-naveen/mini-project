import express from 'express'
import { getCurrentCustomerData, addNewPassword ,login, logout, register, sendForgotPwOtp, verifyForgotPWOtp, becomeWorker, verifybecomeWorkerOTP } from '../Contollers/customerController.js';
import userAuth from '../middleWare/userAuth.js';

const customerRoute= express.Router();

customerRoute.post('/register',register);
customerRoute.post('/login',login);
customerRoute.get('/currentCustomerData',userAuth,getCurrentCustomerData);
customerRoute.post('/logout',logout);
customerRoute.post('/sendPwResetOtp',sendForgotPwOtp);
customerRoute.post('/verifyForgotPWOtp',verifyForgotPWOtp);
customerRoute.post('/resetPassword',addNewPassword);
customerRoute.post('/becomWorker',userAuth,becomeWorker);
customerRoute.post('/verifybecomeWorkerOTP',userAuth,verifybecomeWorkerOTP);

export default customerRoute;