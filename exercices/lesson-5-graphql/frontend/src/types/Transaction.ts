import type { User } from "./User";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  kind: "expense" | "transfer";
  payer: User;
  participants: User[];
}
