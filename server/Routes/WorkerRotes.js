import express from 'express'
import userAuth from '../middleWare/userAuth.js';
import { getCurrentWorkerData } from '../Contollers/workerController.js';


const WorkerRoute= express.Router();

WorkerRoute.get('/getCurrentWorkerData',userAuth,getCurrentWorkerData);



export default WorkerRoute;