import { z } from "zod";

export const createExpenseSchema = z.object({
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(200, "Description must be less than 200 characters"),
  amount: z
    .number()
    .positive("Amount must be positive")
    .max(1000000, "Amount is too large"),
  date: z.date().max(new Date(), "Date cannot be in the future"),
  payerId: z.number().int().positive(),
  participantIds: z
    .array(z.number().int().positive())
    .min(1, "At least one participant is required"),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
