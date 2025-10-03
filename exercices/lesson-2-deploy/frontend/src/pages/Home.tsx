import { useEffect, useState } from "react";
import ExpenseItem from "../components/ExpenseItem";
import type { Expense } from "../types/Expense";
import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseSorter from "../components/ExpenseSorter";

const Home = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sort, setSort] = useState<string>("");
  const [payers, setPayers] = useState<string[]>([]);

  const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

  const getAllExpenses = () => {
    fetch(`${host}/expenses?orderBy=${sort}`)
      .then((response) => response.json())
      .then((data: Expense[]) => setExpenses(data));
  };

  useEffect(() => {
    getAllExpenses();
  }, [sort]);

  useEffect(() => {
    getPayers();
  }, []);

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
    <>
      <h1>Expense Sharing App</h1>

      <ExpenseAdd
        handleAdd={handleAdd}
        handleReset={handleReset}
        payers={payers}
      />

      <h3>Expenses ({expenses.length})</h3>
      <ExpenseSorter sort={sort} setSort={setSort} />

      {expenses.map((item, key) => (
        <ExpenseItem key={key} item={item} />
      ))}
    </>
  );
};

export default Home;
