import type { Expense } from "../types/Expense";

interface ExpenseItemProps {
  item: Expense;
}

const ExpenseItem = ({ item }: ExpenseItemProps) => {
  return (
    <div className="w-64 h-64 bg-white shadow-lg rounded-2xl border border-gray-200 p-4 flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {item.description}
      </h3>

      <div className="flex-1 flex flex-col justify-center gap-2 text-sm text-gray-600">
        <p>
          <span className="font-medium">ID:</span> {item.id}
        </p>
        <p>
          <span className="font-medium">Date:</span> {item.date}
        </p>
        <p>
          <span className="font-medium">Payer:</span> {item.payer}
        </p>
      </div>

      <p className="text-center text-green-600 font-bold text-xl">
        {item.amount} €
      </p>
    </div>
  );
};

export default ExpenseItem;
