import express from 'express'
import {readNotifications,deleteNotifications,getCustomerNotifications,deleteComment,cancellbooking,updateProfile,getCurrentCustomerReservations,editComment, getCurrentCustomerData, addNewPassword ,login, logout, register, sendForgotPwOtp, verifyForgotPWOtp, becomeWorker, verifybecomeWorkerOTP, createWorker, addComment, addReservation } from '../Contollers/customerController.js';
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
customerRoute.post('/createWorker',userAuth,createWorker);
customerRoute.post('/addComment',userAuth,addComment);
customerRoute.post('/editComment',editComment);
customerRoute.post('/deleteComment',deleteComment)
customerRoute.post('/addReservation',userAuth,addReservation);
customerRoute.get('/myReservations',userAuth,getCurrentCustomerReservations);
customerRoute.post('/updateProfile',userAuth,updateProfile);
customerRoute.post('/cancellbooking',cancellbooking);
customerRoute.post('/getCustomerNotifications',userAuth, getCustomerNotifications);
customerRoute.post('/deleteNotifications',deleteNotifications);
customerRoute.post('/readNotifications',userAuth,readNotifications);
export default customerRoute;