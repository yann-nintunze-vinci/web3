import type { Expense } from "../types/Expense";
import { useForm } from "react-hook-form";

interface ExpenseAddProps {
  handleAdd: (newExpense: Expense) => void;
  handleReset: () => void;
  payers: string[];
}

const ExpenseAdd = ({ handleAdd, handleReset, payers }: ExpenseAddProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Expense>();

  const onSuccess = (data: Expense) => {
    const newExpense: Expense = {
      date: new Date(Date.now()).toISOString(),
      description: data.description,
      payer: data.payer,
      amount:
        typeof data.amount === "string" ? parseFloat(data.amount) : data.amount,
    };
    handleAdd(newExpense);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSuccess)} style={{ display: "flex", gap: "1em", marginBottom: '1em' }}>
        <input
          {...register("description", {
            required: "Description required",
            maxLength: { value: 100, message: "Max 100 chars" },
          })}
          placeholder="description"
        />
        {errors.description && <>{errors.description.message}</>}

        <select {...register("payer")}>
          {payers.map((payer, key) => (
            <option key={key}>{payer}</option>
          ))}
        </select>
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
        {errors.amount && <>{errors.amount.message}</>}

        <button type="submit">Add</button>
      </form>

      <button onClick={handleReset}>Reset Data</button>
    </>
  );
};

export default ExpenseAdd;
