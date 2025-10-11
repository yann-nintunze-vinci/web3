import "./App.css";
import { useContext, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { ExpensesContext } from "./contexts/ExpensesContext";
import type { ExpensesContextType } from "./type";

const App = () => {
  const { getAllExpenses, getPayers, sort } =
    useContext<ExpensesContextType>(ExpensesContext);

  useEffect(() => {
    getAllExpenses();
  }, [sort]);

  useEffect(() => {
    getPayers();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
