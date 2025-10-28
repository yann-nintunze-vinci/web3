import { env } from "@/common/utils/envConfig";
import {
  AppError,
  AuthenticationError,
  ConflictError,
} from "@/errors/AppErrors";
import { PrismaClient } from "@/generated/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { RegisterInput, LoginInput } from "@/validation/authSchemas";

const prisma = new PrismaClient();
const JWT_SECRET = env.JWT_SECRET;
const SALT_ROUNDS = 10;

interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const register = async (input: RegisterInput): Promise<AuthResponse> => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  // Create user
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
    },
  });

  // Generate JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

const login = async (input: LoginInput): Promise<AuthResponse> => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new AuthenticationError("Invalid email or password");
  }

  // Verify password
  const validPassword = await bcrypt.compare(input.password, user.password);

  if (!validPassword) {
    throw new AuthenticationError("Invalid email or password");
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

const verifyToken = (token: string): { userId: number; email: string } => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
  } catch (error) {
    throw new AppError("Invalid or expired token");
  }
};

export { register, login, verifyToken };
