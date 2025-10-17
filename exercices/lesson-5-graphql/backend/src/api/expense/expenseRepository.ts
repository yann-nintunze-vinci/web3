import { PrismaClient } from "../../../generated/prisma";
import { Expense } from "./expenseModel";

const prisma = new PrismaClient();

const getAllExpenses = async () => {
  return prisma.expense.findMany({
    include: {
      payer: true,
      participants: true,
    },
  });
};

const getExpenseById = async (id: number) => {
  return prisma.expense.findUnique({
    where: { id },
    include: {
      payer: true,
      participants: true,
    },
  });
};

const createExpense = async ({
  description,
  amount,
  date,
  payerId,
  participantIds = [],
}: Expense) => {
  return prisma.expense.create({
    data: {
      description,
      amount,
      date,
      payerId,
      participants: { connect: participantIds.map((id) => ({ id })) },
    },
    include: {
      payer: true,
      participants: true,
    },
  });
};

export { getAllExpenses, getExpenseById, createExpense };
