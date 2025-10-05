import "./App.css";
import { createContext, useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import type { Expense } from "./types/Expense";
import ExpenseAdd from "./components/ExpenseAdd";
import List from "./components/List";

const defaultPageContext = {
  currentPage: "Welcome",
  setCurrentPage: () => {},
};

export const PageContext = createContext<{
  currentPage: string;
  setCurrentPage: (p: string) => void;
}>(defaultPageContext);

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

  const pages: { [key: string]: React.FunctionComponent<any> } = {
    Welcome: Welcome,
    List: (_) => <List expenses={expenses} sort={sort} setSort={setSort} />,
    Add: (_) => (
      <ExpenseAdd
        handleAdd={handleAdd}
        handleReset={handleReset}
        payers={payers}
      />
    ),
  };

  const handlePageChange = (page: string) => {
    window.history.pushState(null, page, `/${page.toLowerCase()}`);
    setCurrentPage(page);
  };

  const CurrentPageComponent = pages[currentPage];

  return (
    <PageContext.Provider
      value={{ currentPage, setCurrentPage: handlePageChange }}
    >
      <CurrentPageComponent />
    </PageContext.Provider>
  );
};

export default App;
