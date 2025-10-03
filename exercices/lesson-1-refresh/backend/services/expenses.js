const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const defaultExpenses = {
  data: [
    {
    date: "2025-01-16T10:20:00.000Z",
    description: "Example expense #1 from Alice",
    payer: "Alice",
    amount: 25.5
  },
  {
    date: "2025-01-15T19:10:00.000Z",
    description: "Example expense #2 from Bob",
    payer: "Bob",
    amount: 35
  },
  {
    date: "2025-01-15T14:40:00.000Z",
    description: "Example expense #3 from Alice",
    payer: "Alice",
    amount: 2
  }
  ]
};

const getAllExpenses = async (sort) => {
  switch (sort) {
    case "date-asc":
      return await prisma.expense.findMany({
      orderBy: { date: 'asc'}
    });
    case "date-desc":
      return await prisma.expense.findMany({
      orderBy: { date: 'desc'}
    });
    case "amount-asc":
      return await prisma.expense.findMany({
      orderBy: { amount: 'asc'}
    });
    case "amount-desc":
      return await prisma.expense.findMany({
      orderBy: { amount: 'desc'}
    });
    default:
      return await prisma.expense.findMany({
      orderBy: { id: 'asc'}
      });
  }
}

const addExpense = async (newExpense) => {
    return await prisma.expense.create({
        data: newExpense
        });
}

const resetExpenses = async () => {
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Expense" RESTART IDENTITY CASCADE');
    await prisma.expense.createMany(defaultExpenses);
}

module.exports = { getAllExpenses, addExpense, resetExpenses, defaultExpenses}