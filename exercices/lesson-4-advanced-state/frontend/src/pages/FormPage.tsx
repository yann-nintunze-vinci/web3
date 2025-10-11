import type { ExpensesContextType, Expense } from "../type";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ExpensesContext } from "../contexts/ExpensesContext";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const { handleAdd, payers } =
    useContext<ExpensesContextType>(ExpensesContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Expense>();
  const navigate = useNavigate();

  const onSuccess = (data: Expense) => {
    const newExpense: Expense = {
      date: new Date(Date.now()).toISOString(),
      description: data.description,
      payer: data.payer,
      amount:
        typeof data.amount === "string" ? parseFloat(data.amount) : data.amount,
    };
    handleAdd(newExpense);
    navigate("/expenses");
  };

  return (
    <>
      <h2>Add expense</h2>

      <form
        onSubmit={handleSubmit(onSuccess)}
        style={{ display: "flex", gap: "1em", marginBottom: "1em" }}
      >
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
    </>
  );
};

export default FormPage;
