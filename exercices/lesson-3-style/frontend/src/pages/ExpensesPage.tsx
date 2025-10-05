import type { ExpensesContextType } from "../type.ts";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseSorter from "../components/ExpenseSorter";
import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext.tsx";

const ExpensesPage = () => {
  const { expenses, sort, setSort, handleReset } =
    useContext<ExpensesContextType>(ExpensesContext);
  return (
    <>
      <h2>Expenses ({expenses.length})</h2>
      <span>Sort by: </span>
      <ExpenseSorter sort={sort} setSort={setSort} />

      {expenses.map((item, key) => (
        <ExpenseItem key={key} item={item} />
      ))}

      <button onClick={handleReset} style={{ marginTop: "1em" }}>
        Reset Data
      </button>
    </>
  );
};

export default ExpensesPage;
