import "./App.css";
import { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import type { Expense } from "./types/Expense";
import ExpenseAdd from "./components/ExpenseAdd";
import List from "./components/List";

const App = () => {
  const [currentPage, setCurrentPage] = useState<string>("Welcome");
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

  if (currentPage == "Welcome")
    return <Welcome setCurrentPage={setCurrentPage} />;
  if (currentPage == "Add")
    return (
      <ExpenseAdd
        handleAdd={handleAdd}
        handleReset={handleReset}
        payers={payers}
      />
    );

  if (currentPage == "List")
    return <List expenses={expenses} sort={sort} setSort={setSort} />;
};

export default App;
