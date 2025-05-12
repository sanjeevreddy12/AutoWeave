import {  Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { Signinbody, Signupbody } from "../types";
const router = Router();

router.post("/signup", async (req : Request , res :any)=> {
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


    
})
router.post("/signin", (req,res)=>{
    
    
})
router.get("/user", authMiddleware, (req,res)=>{
    
})



export const userRouter = router;
