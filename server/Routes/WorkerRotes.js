import express from 'express'
import userAuth from '../middleWare/userAuth.js';
import { addServices, getAllComment, getCurrentWorkerData, getServiceData } from '../Contollers/workerController.js';
import { getAllServices } from '../Contollers/workerController.js';


const WorkerRoute= express.Router();

WorkerRoute.post('/addServise',addServices);
WorkerRoute.get('/getCurrentWorkerData',userAuth,getCurrentWorkerData);
WorkerRoute.get('/getAllServices',getAllServices);
WorkerRoute.get('/getServiseData/:serviceId',getServiceData);
WorkerRoute.get('/getAllCommets/:serviceId',getAllComment);


// customerRoute.get('/getAllServices',getAllServices);



export default WorkerRoute;