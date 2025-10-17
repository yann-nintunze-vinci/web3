import { Router } from "express";
import * as userController from "./userController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { GetUserSchema } from "./userModel";

const userRouter: Router = Router();

userRouter.get("/", userController.getUsers);
userRouter.get(
  "/:id",
  validateRequest(GetUserSchema),
  userController.getUserDetail
);
userRouter.post("/", userController.createUser);

export default userRouter;
