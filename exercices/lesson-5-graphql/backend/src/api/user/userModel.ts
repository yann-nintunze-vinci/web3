import { commonValidations } from "@/common/utils/commonValidation";
import { z } from "zod";

type User = z.infer<typeof UserSchema>;

const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string(),
  bankAccount: z.string().optional(),
  paidExpenses: z.array(z.number()),
  participatedExpenses: z.array(z.number()),
  transfersOut: z.array(z.number()),
  transfersIn: z.array(z.number()),
});

const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export { User, GetUserSchema };
