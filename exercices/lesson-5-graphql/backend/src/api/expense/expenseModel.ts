import { commonValidations } from "@/common/utils/commonValidation";
import { z } from "zod";

type Expense = z.infer<typeof ExpenseSchema>;

const ExpenseSchema = z.object({
  id: z.number().optional(),
  description: z.string(),
  amount: z.number(),
  date: z.date().optional(),
  payerId: z.number(),
  participantIds: z.array(z.number()),
});

const GetExpenseSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export { Expense, GetExpenseSchema };
