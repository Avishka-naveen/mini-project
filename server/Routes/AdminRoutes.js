import express from 'express'
import {enableWorker,disableWorker, getAllUsersData ,deleteCustomer,getAllWorkers,deleteWorker ,getAllReservations} from '../Contollers/adminController.js';

const adminRoute=express.Router();

adminRoute.get('/getAllUsersData',getAllUsersData);
adminRoute.post('/deleteCustomer',deleteCustomer);
adminRoute.get('/getAllWorkers',getAllWorkers);
adminRoute.post('/deleteWorker',deleteWorker);
adminRoute.post('/disableWorker',disableWorker);
adminRoute.post('/enableWorker',enableWorker);
adminRoute.get('/getAllReservations',getAllReservations)




export default adminRoute;