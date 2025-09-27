import { useEffect, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import type { Expense } from "../types/Expense";
import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseSorter from "../components/ExpenseSorter";

const Home = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sort, setSort] = useState<string>("");

  const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

  const getAllExpenses = () => {
    fetch(`${host}/api/expenses?orderBy=${sort}`)
      .then((response) => response.json())
      .then((data: Expense[]) => setExpenses(data));
  };

  useEffect(() => {
    getAllExpenses();
  }, [sort]);

  const handleAdd = (newExpense: Expense) => {
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
    fetch(`${host}/api/expenses/reset?orderBy=${sort}`, {
      method: "POST",
    }).then(() => getAllExpenses());
  };

  return (
    <>
      <ExpenseSorter sort={sort} setSort={setSort} />

      {expenses.map((item, key) => (
        <ExpenseItem key={key} item={item} />
      ))}

      <ExpenseAdd handleAdd={handleAdd} />

      <button onClick={handleReset}>Reset Data</button>
    </>
  );
};

export default Home;
