const mongoose=require("mongoose");

const FlightSchema=mongoose.Schema({
    airline: {
        type:String,
        require:true
    },
    flightNo:{
        type:String,
        require:true
    },
    departure:{
        type:String,
        require:true
    },
    arrival: {
        type:String,
        require:true
    },
    departureTime:{
        type:String,
        require:true
    },
    arrivalTime:{
        type:String,
        require:true
    },
    seats:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
});

const FlightModel=mongoose.model("Flightdata",FlightSchema);

module.exports={FlightModel};