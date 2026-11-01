"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBalanceSummary } from "@/features/action";
import { convertToIDR } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";

export function BalanceCards() {
  const { data, error } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalanceSummary(),
  });

  if (error) {
    return (
      <div className="w-full p-4 border-destructive/50 text-destructive rounded-lg bg-destructive/10 text-sm">
        Failed get balance
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-main">
            <WalletIcon className="size-4" />
            Saving
          </CardTitle>

          <CardDescription className="text-2xl font-semibold text-black">
            {convertToIDR(Number(data?.savings) || 0)}
          </CardDescription>
        </CardHeader>

        <CardFooter className="text-sm">Savings for all time</CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-main">
            <TrendingUpIcon className="size-4 text-main" />
            Income
          </CardTitle>

          <CardDescription className="text-2xl font-semibold text-black">
            {convertToIDR(Number(data?.totalIncome) || 0)}
          </CardDescription>
        </CardHeader>

        <CardFooter className="text-sm">Total Incomes all time</CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-main">
            <TrendingDownIcon className="size-4 text-main" />
            Expenses
          </CardTitle>

          <CardDescription className="text-2xl font-semibold text-black">
            {convertToIDR(Number(data?.totalExpense) || 0)}
          </CardDescription>
        </CardHeader>

        <CardFooter className="text-sm">Total expenses for all time</CardFooter>
      </Card>
    </div>
  );
}
