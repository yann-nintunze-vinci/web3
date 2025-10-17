import { Router } from "express";
import * as transferController from "./transferController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { GetTransferSchema } from "./transferModel";
const transferRouter = Router();

transferRouter.get("/", transferController.listTransfers);
transferRouter.get(
  "/:id",
  validateRequest(GetTransferSchema),
  transferController.getTransferById
);
transferRouter.post("/", transferController.createTransfer);

export default transferRouter;
