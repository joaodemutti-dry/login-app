import z from "zod";

export const loginSchema = z.object({
    user: z.string(),
    password: z.string()
})


export type loginDto = z.infer<typeof loginSchema>