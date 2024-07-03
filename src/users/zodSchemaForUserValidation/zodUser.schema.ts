import {z} from 'zod'

export const createUserSchema = z
.object({
  name:z.string()
  .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value ?? ""), 'Name should contain only alphabets')
  .refine((value) => /^[a-zA-Z]+\s+[a-zA-Z]+$/.test(value ?? ""), 'Please enter both firstname and lastname'),
  email:z.string().email(),
  password:z.string()
}).required()

 export type CreateUserDto = z.infer<typeof createUserSchema>