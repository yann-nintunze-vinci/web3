import ApiClient from "@/lib/api";
import type { Transaction } from "@/types/Transaction";

export interface LoaderData {
  transactions: Transaction[];
}

export const loader = async () => {
  const transactions = await ApiClient.getTransactions();
  return { transactions };
};
