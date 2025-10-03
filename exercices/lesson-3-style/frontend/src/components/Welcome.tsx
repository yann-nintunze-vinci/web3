import { useContext } from "react";
import { PageContext } from "../App";

const Welcome = () => {
  const { setCurrentPage } = useContext(PageContext);
  return (
    <>
      <h1>Welcome to the Expense Tracker</h1>
      <button onClick={() => setCurrentPage("List")}>View Expenses</button>
      <button onClick={() => setCurrentPage("Add")}>Add Expense</button>
    </>
  );
};

export default Welcome;
