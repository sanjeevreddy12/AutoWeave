import { Router } from "express";
import { prismaclient } from "../db";

const router = Router();

router.get("/available", async (req, res) => {
    const availableTriggers = await prismaclient.availableTrigger.findMany({

    })
    res.json({
        availableTriggers
    })

    
})


export const triggerRouter = router;