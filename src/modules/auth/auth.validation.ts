import { z } from "zod";
import { USER_ROLE } from "../user/user.constants";
const createUserValidation = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(10).max(15),
  address: z.string().min(5).max(100),
  role: z.nativeEnum(USER_ROLE),
});
const updateUserValidation = z.object({
  name: z
    .string({ invalid_type_error: "Name Field must be inserted." })
    .min(2)
    .max(50)
    .optional(),

  phone: z
    .string({ invalid_type_error: "Phone Number Field must be inserted." })
    .min(1)
    .max(15)
    .optional(),
});
export const UserValidations = {
  createUserValidation,
  updateUserValidation,
};
