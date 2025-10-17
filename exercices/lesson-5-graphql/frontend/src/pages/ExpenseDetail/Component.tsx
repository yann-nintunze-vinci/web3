import { useLoaderData } from "react-router-dom";
import type { LoaderData } from "./loader";

const ExpenseDetail = () => {
  const { expense } = useLoaderData<LoaderData>();
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Expense Details</h2>

      <div className="mb-2">
        <span className="font-semibold">Description:</span>{" "}
        {expense.description}
      </div>

      <div className="mb-2">
        <span className="font-semibold">Date:</span>{" "}
        {new Date(expense.date).toLocaleDateString()}
      </div>

      <div className="mb-2">
        <span className="font-semibold">Amount:</span>{" "}
        <span className="text-teal-700 font-bold">
          {expense.amount.toFixed(2)} €
        </span>
      </div>

      <div className="mb-2">
        <span className="font-semibold">Paid by:</span> {expense.payer.name}
      </div>

      <div className="mb-2">
        <span className="font-semibold">Participants:</span>{" "}
        {expense.participants.map((user, i) => (
          <span key={user.id}>
            {user.name}
            {i < expense.participants.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExpenseDetail;
