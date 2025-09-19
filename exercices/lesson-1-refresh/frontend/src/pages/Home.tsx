import { useEffect, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import type { Expense } from "../types/Expense";
import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseSorter from "../components/ExpenseSorter";

const Home = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/expenses/")
      .then((response) => response.json())
      .then((data: Expense[]) => setExpenses(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/expenses?orderBy=${sort}`)
      .then((response) => response.json())
      .then((data: Expense[]) => setExpenses(data));
  }, [sort]);

  const handleAdd = (newExpense: Expense) => {
    newExpense.id = (expenses.length + 1).toString();

    fetch("http://localhost:3000/api/expenses/", {
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
    fetch("http://localhost:3000/api/expenses/reset/", {
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
