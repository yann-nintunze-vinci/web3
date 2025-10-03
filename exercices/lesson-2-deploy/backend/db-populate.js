const { PrismaClient } = require('./generated/prisma');
const { defaultExpenses } = require('./services/expenses');

const prisma = new PrismaClient();

async function main() {
    await prisma.expense.createMany({
  data: defaultExpenses
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