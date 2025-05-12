import {z} from "zod";

export const Signupbody = z.object({
    username : z.string().min(5),
    password : z.string().min(6)
})

export const Signinbody = z.object({
    username: z.string(),
    password : z.string()
})