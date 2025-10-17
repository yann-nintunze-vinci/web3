import { Router } from "express";
import * as transactionController from "./transactionController";

const transactionRouter: Router = Router();

transactionRouter.get("/", transactionController.getAllTransactions);

export default transactionRouter;
