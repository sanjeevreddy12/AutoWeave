import {  Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { Signinbody, Signupbody } from "../types";
import { prismaclient } from "../db";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const router = Router();
const generatetoken = ()=>{
   return crypto.randomBytes(20).toString("hex")
}

router.post("/signup", async (req , res )=> {
    const bodys = req.body;
    const parsedbody = Signupbody.safeParse(bodys);
    if (!parsedbody.success) {
         return res.status(400).json({ msg: "Invalid input" });
       
       
    }
    const userexists = await prismaclient.user.findFirst({
        where : {
            email : parsedbody.data.username
        }
    })
    if(userexists )
    {
        return res.json({
            msg : "user already exists"
        })
    }
    console.time("signup");
    const token = generatetoken();
    const hashedpass = await bcrypt.hash(parsedbody.data.password,5);
    const user = await prismaclient.user.create({
        data : {
            email : parsedbody.data.username,
            password : hashedpass,
            name : parsedbody.data.name,
            verificationToken : token,
            verificationTokenExpiry : new Date(Date.now() + 24*60*60*1000),
            isVerified : false


        }
    })
    console.log("details entered");
    console.timeEnd("signup");
    


    
})
router.post("/signin", async(req,res)=>{
    const body =req.body;
    const parsedbody = Signinbody.safeParse(body);
    if(!parsedbody.success){
        return res.status(411).json({
            msg : "Incorrect Inputs"
        })
    }
    const user = await prismaclient.user.findFirst({
        where : {
            email : body.username
        }
    });
    if(!user)
    {
        return res.status(403).json({
            msg : "User does not exist"
        })
    }
    const cmppassword = await bcrypt.compare(body.password,user.password);
    if(!cmppassword)
    {
        return res.status(403).json({
            msg : "Invalid Credentials"
        })
    }
    
    const token = jwt.sign({
        id : user.id
    },"secret");

    res.json({
        token : token
    })
    
    
})
router.get("/user", authMiddleware, async (req,res)=>{
    //@ts-ignore
    const id = req.id;
    const user = await prismaclient.user.findFirst({
        where : {
            id
        },
        select : {
            name : true,
            email : true
        }
    })
    return res.json({
        user
    })
    
})



export const userRouter = router;
