interface Expense {
  id?: string;
  date: string;
  description: string;
  payer: string;
  amount: number;
}

interface ExpensesContextType {
  getAllExpenses: () => void;
  expenses: Expense[];
  handleAdd: (exp: Expense) => void;
  handleReset: () => void;
  getPayers: () => void;
  payers: string[];
  sort: string;
  setSort: (s: string) => void;
}

export type { Expense, ExpensesContextType };
