import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import * as userRepository from "./userRepository";

const getUsers = async (_: Request, res: Response) => {
  const expenses = await userRepository.getUsers();
  res.status(StatusCodes.OK).json(expenses);
};

const getUserDetail = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await userRepository.getUser(id);
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
  }
  res.status(StatusCodes.OK).json(user);
};

const createUser = async (req: Request, res: Response) => {
  const {
    name,
    email,
    bankAccount,
    paidExpenses,
    participatedExpenses,
    transfersIn,
    transfersOut,
  } = req.body;

  const newUser = await userRepository.createUser({
    name,
    email,
    bankAccount,
    paidExpenses,
    participatedExpenses,
    transfersIn,
    transfersOut,
  });

  res.status(StatusCodes.CREATED).json(newUser);
};

export { getUserDetail, createUser, getUsers };
