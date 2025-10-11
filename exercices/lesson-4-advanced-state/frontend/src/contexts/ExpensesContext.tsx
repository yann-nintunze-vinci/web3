import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { ExpensesContextType, Expense } from "../type";

const defaultExpensesContext: ExpensesContextType = {
  getAllExpenses: () => {},
  expenses: [],
  handleAdd: () => {},
  handleReset: () => {},
  getPayers: () => {},
  payers: [],
  sort: "",
  setSort: () => {},
};

const ExpensesContext = createContext<ExpensesContextType>(
  defaultExpensesContext
);

const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sort, setSort] = useState<string>("");
  const [payers, setPayers] = useState<string[]>([]);

  const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

  const getAllExpenses = () => {
    fetch(`${host}/expenses?orderBy=${sort}`)
      .then((response) => response.json())
      .then((data: Expense[]) => setExpenses(data));
  };

  const handleAdd = (newExpense: Expense) => {
    fetch(`${host}/expenses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    })
      .then((response) => response.json())
      .then((data: Expense) => setExpenses((expenses) => [...expenses, data]));
  };

  const handleReset = () => {
    fetch(`${host}/expenses/reset?orderBy=${sort}`, {
      method: "POST",
    }).then(() => getAllExpenses());
  };

  const getPayers = () => {
    fetch(`${host}/expenses/payers`)
      .then((response) => response.json())
      .then((data: string[]) => setPayers(data));
  };

  return (
    <ExpensesContext.Provider
      value={{
        getAllExpenses,
        expenses,
        handleAdd,
        handleReset,
        getPayers,
        payers,
        setSort,
        sort,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export { ExpensesContext, ExpensesProvider };
