import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from './config/dbConnection.js';
import customerRoute from './Routes/CustomerRoutes.js';


const app = express()

// DB connection
connectDB();


app.use(
  cors({
    origin: "http://localhost:5173", // our frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// // ✅ ADD THIS TEST ROUTE FIRST
app.get('/test', (req, res) => {
  res.json({ success: true, message: "Server is working!" });
});

// API Routes
app.use('/api/customer',customerRoute);



const PORT = 5000

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)

})