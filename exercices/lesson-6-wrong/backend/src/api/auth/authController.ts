import type { Request, Response } from "express";
import * as authService from "./authService";
import type { LoginInput, RegisterInput } from "@/types/AuthTypes";

const register = async (req: Request, res: Response) => {
  try {
    const input: RegisterInput = req.body;
    const result = await authService.register(input);
    res.status(201).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    res.status(400).json({ error: message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const input: LoginInput = req.body;
    const result = await authService.login(input);
    res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    res.status(401).json({ error: message });
  }
};

export { register, login };
