import { Router, Request } from "express";
import { authMiddleware } from "../middleware";
import { zapSchema } from "../types";
import { prismaclient } from "../db";
import { error } from "console";



const router = Router();

router.post("/",authMiddleware,async (req,res)=>{


    //@ts-ignore
    const id = req.user?.id;
    if(id===undefined)
    {
        return res.json({
            msg : "id is missing"
        })
    }
    const body = req.body;
    const parsedbody = zapSchema.safeParse(body);
    if(!parsedbody.success){
        return res.status(411).json({
            msg : "Invalid inputs"
        })
    }

       const zapId = await prismaclient.$transaction(async (tx: { zap: { create: (arg0: { data: { userId: number; triggerId: string; actions: { create: { actionId: string; sortringOrder: number; metadata: any; }[]; }; }; }) => any; update: (arg0: { where: { id: any; }; data: { triggerId: any; }; }) => any; }; trigger: { create: (arg0: { data: { triggerId: string; zapId: any; }; }) => any; }; }) => {
       
        try {
            const zap = await tx.zap.create({
                data : {
                    userId : id,
                    triggerId : "",
                    actions : {
                        create : body.actions.map((x :any,index : number)=>({
                            actionId : x.availableActionId,
                            sortingOrder : index,
                            metadata : x.actionMetaData
                        }))
                    }
                }
            })
            const trigger = await tx.trigger.create({
                data : {
                    triggerId : body.availableTriggerId,
                    zapId : zap.id
                }
            })
            await tx.zap.update({
                where : {id : zap.id},
                data : {triggerId : trigger.id}
            })
            return zap.id
        }
        catch(e){
            console.error("something went wrong",e);
            throw error;
        }


    })
    return res.json({
        zapId
    })


})
router.get("/", authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.user?.id;
    const zaps = await prismaclient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zaps
    })
})

router.get("/:zapId", authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.user?.id;
    const zapId = req.params.zapId;

    const zap = await prismaclient.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zap
    })

})




export const zapRouter = router;