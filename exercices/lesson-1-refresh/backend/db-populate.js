const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
    await prisma.expense.createMany({
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
});
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });