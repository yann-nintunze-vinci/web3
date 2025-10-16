const { PrismaClient } = require("./generated/prisma");

const alice = await prisma.user.upsert({
  where: { email: "alice@expenso.dev" },
  update: {},
  create: {
    name: "Alice",
    email: "alice@expenso.dev",
  },
});

const bob = await prisma.user.upsert({
  where: { email: "bob@expenso.devm" },
  update: {},
  create: {
    name: "Bob",
    email: "bob@expenso.dev",
  },
});

const defaultExpenses = [
  {
    date: new Date("2025-01-16T10:20:00.000Z"),
    description: "Example expense #1 from Alice",
    payerId: alice.id,
    amount: 25.5,
  },
  {
    date: new Date("2025-01-15T19:10:00.000Z"),
    description: "Example expense #2 from Bob",
    payerId: bob.id,
    amount: 35,
  },
  {
    date: new Date("2025-01-15T14:40:00.000Z"),
    description: "Example expense #3 from Alice",
    payerId: alice.id,
    amount: 2,
  },
];

await prisma.expense.createMany({
  data: defaultExpenses,
});

await prisma.transfert.createMany({
  data: [
    {
      sourceId: alice.id,
      targetId: bob.id,
    },
    {
      sourceId: bob.id,
      targetId: alice.id,
    },
  ],
});

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
