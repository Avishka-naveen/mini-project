import express from 'express'
import userAuth from '../middleWare/userAuth.js';
import {completeUserBooking,deleteUserBooking,acceptUserBooking,updateWorkerProfile,editService, addServices, getAllComment, getCurrentWorkerData, getServiceData,getMyReservations,getMyServices,deleteService } from '../Contollers/workerController.js';
import { getAllServices } from '../Contollers/workerController.js';


const WorkerRoute= express.Router();

WorkerRoute.post('/addServise',addServices);
WorkerRoute.get('/getCurrentWorkerData',userAuth,getCurrentWorkerData);
WorkerRoute.get('/getAllServices',getAllServices);
WorkerRoute.get('/getServiseData/:serviceId',getServiceData);
WorkerRoute.get('/getAllCommets/:serviceId',getAllComment);
WorkerRoute.get('/getMyReservations',userAuth,getMyReservations);
WorkerRoute.get('/getMyServices',userAuth,getMyServices);
WorkerRoute.post('/deleteService',deleteService);
WorkerRoute.post('/updateService',editService);
WorkerRoute.post('/updateWorkerProfile',userAuth,updateWorkerProfile);
WorkerRoute.post('/acceptUserBooking',acceptUserBooking);
WorkerRoute.post('/deleteUserBooking',deleteUserBooking);
WorkerRoute.post('/completeUserBooking',completeUserBooking)


// customerRoute.get('/getAllServices',getAllServices);



export default WorkerRoute;