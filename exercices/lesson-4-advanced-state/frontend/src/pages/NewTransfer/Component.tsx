import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useCurrentUser } from "../Layout";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { LoaderData } from "./loader";
import ApiClient from "@/lib/api";
import type { NewTransferPayload } from "@/types/Transfer";
import { useState } from "react";

type TransferErrors = {
  validation?: string;
  backend?: string;
  amount?: string;
  target?: string;
};

const NewTransfer = () => {
  const { users } = useLoaderData<LoaderData>();
  const [target, setTarget] = useState<number>(0);
  const [customErrors, setCustomErrors] = useState<TransferErrors>({});
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSuccess: SubmitHandler<FieldValues> = async (data) => {
    const newErrors: TransferErrors = {};

    if (!currentUser) {
      newErrors.validation = "Utilisateur courant manquant.";
    }

    if (target === 0) {
      newErrors.target = "Veuillez sélectionner un destinataire.";
    }

    if (isNaN(data.amount)) {
      newErrors.amount = "Montant invalide.";
    }

    if (Object.keys(newErrors).length > 0) {
      setCustomErrors(newErrors);
      return;
    }

    const newTransfert: NewTransferPayload = {
      sourceId: currentUser!.id,
      targetId: target,
      amount: data.amount,
    };

    try {
      await ApiClient.createTransfer(newTransfert);
      navigate("/transactions");
    } catch (e) {
      console.error("Erreur API :", e);
      setCustomErrors({
        backend: "Une erreur est survenue lors de la création du transfert.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="space-y-4">
      {/* Bloc d'erreurs globales */}
      {customErrors.validation && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {customErrors.validation}
        </div>
      )}
      {customErrors.backend && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {customErrors.backend}
        </div>
      )}

      <label className="block">
        <span className="block mb-1 font-medium">Select recipient:</span>
        <select
          className="bg-white text-black rounded px-2 py-1 w-full"
          value={target ?? ""}
          onChange={(e) => setTarget(Number(e.target.value))}
        >
          <option value="">— Select a user —</option>
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {customErrors.target && (
          <span className="text-red-500 text-sm">{customErrors.target}</span>
        )}
      </label>

      <label className="block">
        <span className="block mb-1 font-medium">Amount:</span>
        <input
          type="number"
          step="0.01"
          {...register("amount", { required: true, min: 0.01 })}
          placeholder="Enter amount"
          className="bg-white text-black rounded px-2 py-1 w-full"
        />
        {formErrors.amount && (
          <span className="text-red-500 text-sm">
            Le montant est requis et doit être positif.
          </span>
        )}
        {customErrors.amount && (
          <span className="text-red-500 text-sm">{customErrors.amount}</span>
        )}
      </label>

      <button
        type="submit"
        className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800"
      >
        Create Transfer
      </button>
    </form>
  );
};

export default NewTransfer;
