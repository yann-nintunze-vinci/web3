import { Router } from "express";
import * as expenseController from "./expenseController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { GetExpenseSchema } from "./expenseModel";
const expenseRouter: Router = Router();

expenseRouter.get("/", expenseController.listExpenses);
expenseRouter.post("/", expenseController.createExpense);
expenseRouter.get(
  "/:id",
  validateRequest(GetExpenseSchema),
  expenseController.getExpenseDetail
);

export default expenseRouter;
