import { Prisma } from "../../../generated/prisma";
import { z } from "zod";

type ExpenseWithPayerAndParticipants = Prisma.ExpenseGetPayload<{
  include: {
    payer: true;
    participants: true;
  };
}>;

type TransferWithSourceAndTarget = Prisma.TransferGetPayload<{
  include: {
    target: true;
    source: true;
  };
}>;

type Transaction = z.infer<typeof TransactionSchema>;

const TransactionSchema = z.object({
  id: z.string(),
  description: z.string(),
  amount: z.number(),
  date: z.date(),
  kind: z.enum(["expense", "transfer"]),
  payer: z.any(),
  participants: z.array(z.any()),
});

const fromExpense = (expense: ExpenseWithPayerAndParticipants): Transaction => {
  return TransactionSchema.parse({
    id: `expense-${expense.id}`,
    description: expense.description,
    amount: expense.amount,
    date: expense.date,
    kind: "expense",
    payer: expense.payer,
    participants: expense.participants,
  });
};

const fromTransfer = (transfer: TransferWithSourceAndTarget): Transaction => {
  return TransactionSchema.parse({
    id: `transfer-${transfer.id}`,
    description: "Transfer",
    amount: transfer.amount,
    date: transfer.date,
    kind: "transfer",
    payer: transfer.source,
    participants: [transfer.target],
  });
};

export { Transaction, fromExpense, fromTransfer };
