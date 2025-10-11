import type { Expense } from "../type";

interface ExpenseItemProps {
  item: Expense;
}

const ExpenseItem = ({ item }: ExpenseItemProps) => {
  return (
    <div>
      <span>#{item.id} </span>
      <span>{item.date.replace("T", " ").slice(0, 16)} </span>
      <span>{item.description} </span>
      <span>Paid by {item.payer} </span>
      <span>${item.amount.toFixed(2)}</span>
    </div>
  );
};

export default ExpenseItem;
