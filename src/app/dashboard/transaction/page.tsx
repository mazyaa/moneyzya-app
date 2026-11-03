import { Metadata } from "next";
import Transaction from "./_components/transaction";
export const metadata: Metadata = {
  title: "Moneyzya - Transaction",
  description: "View and manage your financial transactions with ease.",
};
export default function TransactionPage() {
  return (
    <div className="p-2 space-y-4">
      <section id="header">
        <h1 className="text-4xl font-bold text-main">Transaction</h1>
        <p>
          View and manage your financial transactions with ease.
        </p>
      </section>
      <section id="content">
        <Transaction />
      </section>
    </div>
  );
}
