import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as transferRepository from "./transferRepository";

const listTransfers = async (_: Request, res: Response) => {
  const transfers = await transferRepository.getAllTransfers();
  res.status(StatusCodes.OK).json(transfers);
};

const getTransferById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const transfer = await transferRepository.getTransferById(id);
  if (!transfer) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Transfer not found" });
  }
  res.status(StatusCodes.OK).json(transfer);
};

const createTransfer = async (req: Request, res: Response) => {
  const { sourceId, targetId, amount } = req.body;
  const newTransfer = await transferRepository.createTransfer({
    sourceId: Number(sourceId),
    targetId: Number(targetId),
    amount: parseFloat(amount),
  });
  res.status(StatusCodes.CREATED).json(newTransfer);
};

export { listTransfers, getTransferById, createTransfer };
