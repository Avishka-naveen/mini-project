import express from 'express'
import { login, register } from '../Contollers/customerController.js';

const customerRoute= express.Router();

customerRoute.post('/register',register);
customerRoute.post('/login',login);

export default customerRoute;