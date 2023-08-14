const {Router}=require("express");
const {FlightModel}=require("../model/FlightModel");

const flightRoutes=Router();

flightRoutes.get("/",async(req,res)=>{
    try {
        const data=await FlightModel.find();

        res.status(200).send({
            isError: false,
            data: data
        })
    } catch (error) {
        res.status(400).send({
            isError: true,
            error: error
        })
    }
});

flightRoutes.get("/:id",async(req,res)=>{
    try {
        const{id}=req.params;
        
        const data = await FlightModel.findOne({_id:id});
        console.log(data);

        if(data){
            res.status(200).send({
                isError: false,
                data: data
            })
        }else{
            res.status(400).send({
                isError: true,
                messege: "Flight not found provide correct id"
            })
        }
        
    } catch (error) {
        res.status(400).send({
            isError: true,
            error: error
        })
    }
});

flightRoutes.post("/",async(req,res)=>{
    try {
        const newflight= new FlightModel(req.body);
        newflight.save();
        res.status(201).send({
            isError: false,
            message:"Flight created successfully",
            id: newflight._id,
            newdata:newflight
        })
    } catch (error) {
        res.status(400).send({
            isError: true,
            error: error.messege
        })
    }
});


flightRoutes.delete("/:id",async(req,res)=>{
    try {
        const{id}=req.params;
        
        const data= await FlightModel.findByIdAndDelete(id);

        if(data){
            return res.status(202).send({
                isError: false,
                message:"Flight deleted successfully",
                id: data._id
            })
        }

        res.status(400).send({
            isError: true,
            message:"Flight not found provide correct id"
        })
        
        
    } catch (error) {
        res.status(400).send({
            isError: true,
            error: error.messege
        })
    }
});

flightRoutes.patch("/:id",async(req,res)=>{
    try {
        const{id}=req.params;

        const newdata = await FlightModel.findByIdAndUpdate(id,{...req.body});

        if(newdata){
            return res.status(204).send({
                isError: false,
                id: newdata._id,
                message:"Details updated successfully",
                updatedData:newdata
            })
        }

        res.status(400).send({
            isError: true,
            message:"Flight not found provide correct id"
        })
        
        
    } catch (error) {
        res.status(400).send({
            isError: true,
            message: error.message
        })
    }
});

module.exports={flightRoutes}