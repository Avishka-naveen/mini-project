import express from 'express'
import {getCurrentCustomerReservations, getCurrentCustomerData, addNewPassword ,login, logout, register, sendForgotPwOtp, verifyForgotPWOtp, becomeWorker, verifybecomeWorkerOTP, createWorker, addComment, addReservation } from '../Contollers/customerController.js';
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
customerRoute.post('/addReservation',userAuth,addReservation);
customerRoute.get('/myReservations',userAuth,getCurrentCustomerReservations);

export default customerRoute;