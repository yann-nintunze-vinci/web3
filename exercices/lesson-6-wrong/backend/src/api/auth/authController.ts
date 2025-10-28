import type { Request, Response } from "express";
import * as authService from "./authService";
import { registerSchema, loginSchema } from "@/validation/authSchemas";
import { ValidationError } from "@/errors/AppErrors";
import z from "zod";

const register = async (req: Request, res: Response) => {
  try {
    const validatedInput = registerSchema.parse(req.body);

    const result = await authService.register(validatedInput);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      return res.status(400).json({ error: message });
    }

    const message =
      error instanceof Error ? error.message : "Registration failed";
    res.status(400).json({ error: message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const validatedInput = loginSchema.parse(req.body);

    const result = await authService.login(validatedInput);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      return res.status(400).json({ error: message });
    }

    const message = error instanceof Error ? error.message : "Login failed";
    res.status(401).json({ error: message });
  }
};

export { register, login };
