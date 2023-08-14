const express=require("express");
const cors=require("cors");
require("dotenv").config();
const {connection}=require("./config/db");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const {userRoutes}=require("./routes/user.router");
const {flightRoutes}=require("./routes/flight.routes");
const {bookingRoutes}=require("./routes/bookflight.route");

const app=express();

app.use(express.json());
app.use(cors());


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight-booking API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], 
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


app.get("/",(req,res)=>{
    res.status(200).send("Flight booking server of sambhaji dhore")
});

// routes...........

app.use("/user",userRoutes);
app.use("/flight",flightRoutes);
app.use("/booking",bookingRoutes)


app.listen(process.env.PORT, async ()=>{
    try {
        await connection;
        console.log("connected to DB");
        console.log(`server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})