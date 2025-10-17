import type { User } from "./User";

export interface Expense {
  id: number;
  date: string;
  description: string;
  payer: User;
  amount: number;
  payerId: number;
  participants: User[];
}
