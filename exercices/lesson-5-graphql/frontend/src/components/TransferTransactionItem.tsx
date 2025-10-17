import type { Transaction } from "@/types/Transaction";

interface Props {
  transaction: Transaction;
}

const TransferTransactionItem = ({ transaction }: Props) => {
  const { description, amount, payer, participants } = transaction;

  const recipient = participants[0];

  return (
    <div className="border p-4 rounded bg-blue-50 shadow-sm mb-2">
      <div className="font-semibold text-lg text-blue-800">{description}</div>
      <div className="text-sm text-gray-700">
        <span className="font-medium">{payer.name}</span> transferred{" "}
        <span className="font-bold">{amount.toFixed(2)} €</span> to{" "}
        <span className="font-medium">{recipient?.name}</span>
      </div>
    </div>
  );
};

export default TransferTransactionItem;
