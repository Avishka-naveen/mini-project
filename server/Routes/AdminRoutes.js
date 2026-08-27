import express from 'express'
import {deleteService,getAllComment,getAllServices ,deleteReservation,enableWorker,disableWorker, getAllUsersData ,deleteCustomer,getAllWorkers,deleteWorker ,getAllReservations} from '../Contollers/adminController.js';

const adminRoute=express.Router();

adminRoute.get('/getAllUsersData',getAllUsersData);
adminRoute.post('/deleteCustomer',deleteCustomer);
adminRoute.get('/getAllWorkers',getAllWorkers);
adminRoute.post('/deleteWorker',deleteWorker);
adminRoute.post('/disableWorker',disableWorker);
adminRoute.post('/enableWorker',enableWorker);
adminRoute.get('/getAllReservations',getAllReservations);
adminRoute.post('/deleteReservation',deleteReservation);
adminRoute.get('/getAllServices',getAllServices);
adminRoute.post('/getAllComment', getAllComment);
adminRoute.post('/deleteService',deleteService);




export default adminRoute;