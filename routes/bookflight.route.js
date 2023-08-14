const {Router}=require("express");
const {BookingModel}=require("../model/BookingModel");
const {FlightModel}=require("../model/FlightModel");
const {UserModel}=require("../model/UserModel");
const {auth}=require("../middleware/auth.middleware");
const bookingRoutes=Router();

bookingRoutes.post("/",async(req,res)=>{
    try {
        const {flight,user}=req.body;
        
        const bookingdata= new BookingModel(req.body);
        await bookingdata.save();
        res.status(201).send({
            isError: false,
            message: "Flight Booked Successfully",
            id:bookingdata._id
        })
    } catch (error) {
        res.status(400).send({
            isError: true,
            message: error.message
        })
    }
});

bookingRoutes.get("/dashbord", auth,async(req,res)=>{
    try {
        const {userid}=req.body;

        const allflight= await BookingModel.find({_id:userid});
        res.status(201).send({
            isError: false,
            data:allflight
        })
    } catch (error) {
        res.status(400).send({
            isError: true,
            message: error.message
        })
    }
});


module.exports={bookingRoutes}