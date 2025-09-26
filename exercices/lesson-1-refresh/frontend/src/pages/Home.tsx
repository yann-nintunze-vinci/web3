import { useEffect, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import type { Expense } from "../types/Expense";
import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseSorter from "../components/ExpenseSorter";

const Home = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sort, setSort] = useState<string>("");

  const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';

  useEffect(() => {
    fetch(`${host}/api/expenses/`)
      .then((response) => response.json())
      .then((data: Expense[]) => setExpenses(data));
  }, []);

  useEffect(() => {
    fetch(`${host}/api/expenses?orderBy=${sort}`)
      .then((response) => response.json())
      .then((data: Expense[]) => setExpenses(data));
  }, [sort]);

  const handleAdd = (newExpense: Expense) => {
    newExpense.id = (expenses.length + 1).toString();

    fetch(`${host}/api/expenses/`, {
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
    fetch(`${host}/api/expenses/reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: Expense[]) => setExpenses(data));
  };

  return (
    <>
      <ExpenseSorter setSort={setSort} />

      {expenses.map((item) => (
        <ExpenseItem key={item.id} item={item} />
      ))}

      <ExpenseAdd handleAdd={handleAdd} />

      <button onClick={handleReset}>Reset Data</button>
    </>
  );
};

export default Home;
