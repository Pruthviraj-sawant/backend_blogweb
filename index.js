const express=require('express');
const app=express();

// app.listen(3000,()=>{
// console.log(" listen on port 3000");
// });
//load env file
require('dotenv').config();
const port = process.env.port || 4000;

//middleware to parse json request body
app.use(express.json());

//import routes
const blogroutes=require("./routes/blogroutes");

//mounte
app.use("/api/v1", blogroutes);


//connect to database
const dbconnect=require("./conf/database");
dbconnect();

//start 
app.listen(port,()=>{
    console.log(`server stsarted at ${port}`);  
 })

//default route
app.get("/",(req,res)=>{
    res.send(`<h1>this is home page babyyy....</h1>`)
})

  