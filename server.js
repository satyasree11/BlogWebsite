const express=require('express')
const cors= require('cors')
const colors = require("colors");
const { default: mongoose } = require('mongoose')
const morgan=require('morgan')
const dotenv = require('dotenv');
const connectDB =require('./config/db')
const userRoutes =require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
dotenv.config()
connectDB();


const app=express();
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/blog',blogRoutes)


const PORT = process.env.PORT || 8080;


app.listen(PORT,() =>{
    
    console.log(`Server running  on ${process.env.DEV_MODE} port ${PORT}`.bgCyan.white);
})