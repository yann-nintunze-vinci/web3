import { Response, Request } from "express";
import * as transactionRepository from "./transactionRepository";
import { StatusCodes } from "http-status-codes";

const getAllTransactions = async (_: Request, res: Response) => {
  const transactions = await transactionRepository.getAllTransactions();

  res.status(StatusCodes.OK).json(transactions);
};

export { getAllTransactions };
