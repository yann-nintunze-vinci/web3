import { useLoaderData, useNavigate } from "react-router-dom";
import type { LoaderData } from "./loader";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import graphqlClient from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import toast from "react-hot-toast";

type ExpenseErrors = {
  validation?: string;
  backend?: string;
  amount?: string;
  target?: string;
};

const CREATE_EXPENSE_GQL = gql`
  mutation CreateExpense(
    $description: String!
    $amount: Float!
    $payerId: Int!
    $participantIds: [Int!]!
  ) {
    createExpense(
      description: $description
      amount: $amount
      payerId: $payerId
      participantIds: $participantIds
    ) {
      id
      description
    }
  }
`;

const NewExpense = () => {
  const { users } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const [customErrors, setCustomErrors] = useState<ExpenseErrors>({});

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSuccess: SubmitHandler<FieldValues> = async (data) => {
    try {
      await graphqlClient.mutate({
        mutation: CREATE_EXPENSE_GQL,
        variables: {
          description: data.description,
          amount: parseFloat(data.amount),
          payerId: Number(data.payerId),
          participantIds: data.participantIds.map((id: string) => Number(id)),
        },
      });
      toast("Expense has been created.");
      return navigate("/transactions");
    } catch (e) {
      console.error("Erreur API :", e);
      setCustomErrors({
        backend: "Une erreur est survenue lors de la création du transfert.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <h3 className="text-2xl font-bold ">Créer une dépense</h3>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium  ">Description</label>
        <input
          type="text"
          {...register("description", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formErrors.description && (
          <p className="text-red-500 text-sm mt-1">Ce champ est requis</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium  ">Montant</label>
        <input
          type="number"
          step="0.01"
          {...register("amount", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formErrors.amount && (
          <p className="text-red-500 text-sm mt-1">Ce champ est requis</p>
        )}
      </div>

      {/* Payer */}
      <div>
        <label className="block text-sm font-medium  ">Payeur</label>
        <select
          {...register("payerId", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">— Sélectionner un utilisateur —</option>
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {formErrors.payerId && (
          <p className="text-red-500 text-sm mt-1">Ce champ est requis</p>
        )}
      </div>

      {/* Participants */}
      <div>
        <label className="block text-sm font-medium  ">Participants</label>
        <select
          multiple
          {...register("participantIds", { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-32 focus:ring-blue-500 focus:border-blue-500"
        >
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {formErrors.participantIds && (
          <p className="text-red-500 text-sm mt-1">Ce champ est requis</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Créer la dépense
        </button>
      </div>

      {/* Backend Error */}
      {customErrors.backend && (
        <p className="text-red-600 text-center mt-4">{customErrors.backend}</p>
      )}
    </form>
  );
};

export default NewExpense;
