import type { Expense } from "../types/Expense";
import ExpenseItem from "./ExpenseItem";
import ExpenseSorter from "./ExpenseSorter";

interface ListProps {
  expenses: Expense[];
  sort: string;
  setSort: (s: string) => void;
}

const List = ({ expenses, sort, setSort }: ListProps) => {
  return (
    <>
      <h1>Expenses ({expenses.length})</h1>
      <ExpenseSorter sort={sort} setSort={setSort} />

      {expenses.map((item, key) => (
        <ExpenseItem key={key} item={item} />
      ))}
    </>
  );
};

export default List;
