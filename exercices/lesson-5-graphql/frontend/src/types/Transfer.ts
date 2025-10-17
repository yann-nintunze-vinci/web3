import type { User } from "./User";

interface Transfer {
  id: number;
  sourceId: number;
  targetId: number;
  amount: number;
  date: string;
  source: User;
  target: User;
}

interface NewTransferPayload {
  sourceId: number;
  targetId: number;
  amount: number;
}

export type { Transfer, NewTransferPayload };
