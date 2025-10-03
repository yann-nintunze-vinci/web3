import { useState } from "react";
import type { Expense } from "../types/Expense";
import { useForm } from "react-hook-form";

interface ExpenseAddProps {
  handleAdd: (newExpense: Expense) => void;
}

const ExpenseAdd = ({ handleAdd }: ExpenseAddProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Expense>();

  const onSuccess = (data: Expense) => {
    const expense: Expense = {
      date: new Date(Date.now()).toISOString(),
      description: data.description,
      payer: Math.random() > 0.5 ? "Alice" : "Bob", //changer
      amount:
        typeof data.amount === "string" ? parseFloat(data.amount) : data.amount,
    };
    handleAdd(expense);
  };

  return (
    <>
      <button onClick={() => setShowForm((prev) => !prev)}>Add</button>
      {showForm && (
        <form onSubmit={handleSubmit(onSuccess)}>
          <label>
            Description :
            <input
              {...register("description", {
                required: "Description required",
                maxLength: { value: 100, message: "Max 100 chars" },
              })}
              placeholder="description"
            />
            {errors.description && <div>{errors.description.message}</div>}
          </label>

          <div>
            <label>
              Amount :
              <input
                type="number"
                step="0.01"
                {...register("amount", {
                  required: "Amount required",
                  min: {
                    value: 0.01,
                    message: "Must be positive",
                  },
                })}
                placeholder="amount"
              />
              {errors.amount && <div>{errors.amount.message}</div>}
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default ExpenseAdd;
