import type { Transaction } from "@/types/Transaction";
import { NavLink } from "react-router-dom";

interface Props {
  transaction: Transaction;
}

const ExpenseTransactionItem = ({ transaction }: Props) => {
  const { description, amount, payer, participants } = transaction;
  const param = transaction.id.replace("expense-", "");
  return (
    <div className="border p-4 rounded bg-red-50 shadow-sm mb-2">
      <div className="font-semibold text-lg text-red-800">{description}</div>
      <div className="text-sm text-gray-700">
        <span className="font-medium">{payer.name}</span> paid{" "}
        <span className="font-bold">{amount.toFixed(2)} €</span>
      </div>
      <div className="text-sm text-gray-600 mt-1">
        Split between:{" "}
        {participants.map((user, i) => (
          <span key={user.id}>
            {user.name}
            {i < participants.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
      <NavLink to={`/expenses/${param}`} className="text-gray-700">
        for more details
      </NavLink>
    </div>
  );
};

export default ExpenseTransactionItem;
