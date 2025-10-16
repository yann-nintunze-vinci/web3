import { PrismaClient } from "../../../generated/prisma";
import { Transfer } from "./transferModel";

const prisma = new PrismaClient();

const getAllTransfers = async () => {
  return prisma.transfer.findMany({
    include: {
      source: true,
      target: true,
    },
  });
};

const getTransferById = async (id: number) => {
  return prisma.transfer.findUnique({
    where: { id },
    include: {
      source: true,
      target: true,
    },
  });
};

const createTransfer = async ({
  sourceId,
  targetId,
  amount,
  date,
}: Transfer) => {
  return prisma.transfer.create({
    data: {
      sourceId,
      targetId,
      amount,
      date,
    },
    include: {
      source: true,
      target: true,
    },
  });
};
export { getAllTransfers, getTransferById, createTransfer };
