'use client';

import { useQuery } from "@tanstack/react-query";
import TransactionTable from "./transaction-table";
import { getTransactions } from "@/features/transaction/action";
import { useState } from "react";
import CreateTransactionCard from "./create-transaction-card";

export default function Transaction() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data: transactions, isLoading, refetch } = useQuery({
    queryKey: ["transactions", page, limit, search],
    queryFn: () => getTransactions({ limit, page, search }),
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
      <TransactionTable
        transactions={transactions}
        isLoading={isLoading}
        refetch={refetch}
        page={page}
        limit={limit}
        search={search}
        setPage={setPage}
        setLimit={setLimit}
        setSearch={setSearch}
      />

      <CreateTransactionCard refetch={refetch}/>
    </div>
  );
}
