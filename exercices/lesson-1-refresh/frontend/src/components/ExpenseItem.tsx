import type { Expense } from "../types/Expense";

interface ExpenseItemProps {
  item: Expense;
}

const ExpenseItem = ({ item }: ExpenseItemProps) => {
  return (
    <>
      <p>id: {item.id}</p>
      <p>date: {item.date}</p>
      <p>description: {item.description}</p>
      <p>payer: {item.payer}</p>
      <p>amount: {item.amount}</p>
    </>
  );
};

export default ExpenseItem;
