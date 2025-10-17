import ApiClient from "@/lib/api";
import type { Expense } from "@/types/Expense";
import type { LoaderFunctionArgs } from "react-router-dom";

export interface LoaderData {
  expense: Expense;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.id);
  const expense = await ApiClient.getExpenseById(id);
  return { expense };
};
