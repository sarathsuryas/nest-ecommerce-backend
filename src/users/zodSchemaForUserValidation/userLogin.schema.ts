import {z} from 'zod'

export const userLoginSchema = z.object({
  email:z.string().email(),
  password:z.string()
}).required()

export type UserLoginDto = z.infer<typeof userLoginSchema>