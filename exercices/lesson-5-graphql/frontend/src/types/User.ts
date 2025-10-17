import type { Expense } from "@/types/Expense";
import type { Transfer } from "@/types/Transfer";

export interface User {
  id: number;
  name: string;
  email: string;
  bankAccount?: string;
  paidExpenses: Expense[];
  participatedExpenses: Expense[];
  transfersIn: Transfer[];
  transfersOut: Transfer[];
}
