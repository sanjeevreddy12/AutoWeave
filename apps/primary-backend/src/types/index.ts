import {z} from "zod";

export const Signupbody = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    name : z.string().min(3)
})

export const Signinbody = z.object({
    username: z.string(),
    password : z.string()
})


export const zapSchema = z.object({
    availableTriggerId : z.string(),
    triggerMetaData :z.any().optional(),
    actions : z.array(z.object({
        availableActionId : z.string(),
        actionMetaData : z.any().optional()
    }))

})

