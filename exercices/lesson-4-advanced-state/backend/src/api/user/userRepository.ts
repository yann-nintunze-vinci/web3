import { PrismaClient } from "../../../generated/prisma";
import { User } from "./userModel";

const prisma = new PrismaClient();

const getUsers = async () => {
  return prisma.user.findMany({
    include: {
      paidExpenses: true,
      participatedExpenses: true,
      transfersIn: true,
      transfersOut: true,
    },
  });
};

const getUser = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      paidExpenses: true,
      participatedExpenses: true,
      transfersIn: true,
      transfersOut: true,
    },
  });
};

const createUser = async ({
  id,
  name,
  email,
  bankAccount,
  paidExpenses = [],
  participatedExpenses = [],
  transfersIn = [],
  transfersOut = [],
}: User) => {
  return prisma.user.create({
    data: {
      id,
      name,
      email,
      bankAccount,
      paidExpenses: { connect: paidExpenses.map((id) => ({ id })) },
      participatedExpenses: {
        connect: participatedExpenses.map((id) => ({ id })),
      },
      transfersIn: { connect: transfersIn.map((id) => ({ id })) },
      transfersOut: { connect: transfersOut.map((id) => ({ id })) },
    },
    include: {
      paidExpenses: true,
      participatedExpenses: true,
      transfersIn: true,
      transfersOut: true,
    },
  });
};

export { getUser, createUser, getUsers };
