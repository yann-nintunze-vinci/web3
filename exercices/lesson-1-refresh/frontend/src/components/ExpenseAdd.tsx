import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  handleAdd: (newExpense: Expense) => void;
}

const ExpenseAdd = ({ handleAdd }: ExpenseAddProps) => {
  const onAdd = () => {
    const date = new Date(Date.now()).toISOString().split("T")[0];
    const expense: Expense = {
      date: date,
      description: "Divers",
      payer: Math.random() > 0.5 ? "Alice" : "Bob",
      amount: parseFloat((Math.random() * 100).toFixed(2)),
    };
    handleAdd(expense);
  };
  return <button onClick={onAdd}>Add</button>;
};

export default ExpenseAdd;
