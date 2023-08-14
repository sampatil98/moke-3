const jwt=require("jsonwebtoken");
require("dotenv").config();

const auth=(req,res,next)=>{
    const token=req.headers.split(" ")[1];

    if(token){
        let decode=jwt.verify(token,process.env.privateKey);

        if(decode){
            req.body.userid=decode.userid;
            next();
        }else{
            req.status(400).send({
                isError:true,
                message:"Unauthorised!"
            })
        }
    }else{
        req.status(400).send({
            isError:true,
            message:"Unauthorised! Provide Token"
        })
    }

}

module.exports={auth};