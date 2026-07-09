const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");


const authRoutes =
require("./routes/authRoutes");



const app = express();



app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());




app.use(
"/api/auth",
authRoutes
);



app.get("/",(req,res)=>{


res.json({

message:"Employee Management API running"

});


});

const departmentRoutes =
require("./routes/departmentRoutes");


app.use(

"/api/departments",

departmentRoutes

);

const employeeRoutes =
require("./routes/employeeRoutes");


app.use(

"/api/employees",

employeeRoutes

);

const dashboardRoutes =
require("./routes/dashboardRoutes");



app.use(

"/api/dashboard",

dashboardRoutes

);
const userRoutes =
require("./routes/userRoutes");


app.use(

"/api/users",

userRoutes

);
module.exports = app;