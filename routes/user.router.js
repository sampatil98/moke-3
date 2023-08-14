const { Router } = require("express");
const { UserModel } = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();


const userRoutes = Router();


/**
 * @swagger
 * /user/register:
 *   get:
 *     summary: to register new user
 *     responses:
 *       200:
 *         description: User Registered Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */

userRoutes.post("/register", async (req, res) => {
    try {
        const {password}=req.body;
        bcrypt.hash(password, 5, async (err, hash) => {
           
            if (hash) {
                const data = await UserModel({...req.body,password:hash});
                data.save();
                res.status(201).send({
                    isError: false,
                    message: "User Registered Successfully",
                    id: data._id
                })
            }
            if(err){
                res.status(401).send({
                    isError: true,
                    message: "internal server error",
                })
            }

        });
        
    } catch (error) {
        res.status(400).send({
            isError: true,
            error: error.message
        })
    }
});
/**
 * @swagger
*  /user/login:
*     post:
*       summary: For login
*       requestBody:
*         required: true
*         content:
*           application/json:
*       responses:
*         200:
*           description: Login Successful
*           content:
*             application/json:
*/
userRoutes.post("/login", async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password,(err, result)=> {
                if(err){
                  return  res.status(400).send({
                        isError: true,
                        message:"Wrong password" 
                    }) 
                };
                if(result){
                    let token = jwt.sign({userid:user._id}, process.env.privateKey);
                    return  res.status(201).send({
                        isError: false,
                        message:"Login Successful",
                        id:user._id,
                        token:token
                    });
                }
            });
        }else{
            res.status(400).send({
                isError: true,
                message: "User not Found please register first"
            }) 
        }
        
    } catch (error) {
        res.status(400).send({
            isError: true,
            message: error.message
        })
    }
})


module.exports = { userRoutes }