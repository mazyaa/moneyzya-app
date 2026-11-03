import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTransactions } from "@/features/transaction/action";
import { cn, convertToIDR } from "@/lib/utils";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const TABLE_HEADER = [
  "#",
  "Date",
  "Description",
  "Caetegory",
  "Amount",
  "Action",
];

export default function TransactionTable({
  transactions,
  isLoading,
  //   refetch,
  page,
  limit,
  //   search,
  //   setPage,
  //   setLimit,
  //   setSearch,
}: {
  transactions?: Awaited<ReturnType<typeof getTransactions>>; // The data returned from getTransactions
  page: number;
  limit: number;
  search: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  isLoading: boolean;
  refetch: () => void;
}) {
  return (
    <Fragment>
      <Card className="w-full gap-4">
        <CardHeader className="flex flex-col md:flex-row justify-between gap-2 md:items-center">
          <div>
            <CardTitle>Recent Transacation</CardTitle>
            <CardDescription>Your Latest financial activities</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {TABLE_HEADER.map((header) => (
                  <TableHead key={`th-${header}`}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {!isLoading &&
                transactions?.data?.map((transactions, index) => (
                  <TableRow key={`tr-${transactions.id}`}>
                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {new Date(transactions.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transactions.description}</TableCell>
                    <TableCell>{transactions.category}</TableCell>
                    <TableCell
                      className={cn(
                        "font-semibold",
                        transactions.type === "expense"
                          ? "text-destructive"
                          : "text-green-500",
                      )}
                    >
                      {transactions.type === "expense" && "-"}{" "}
                      {convertToIDR(transactions.amount)}
                    </TableCell>
                    <TableCell className="flex">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-yellow-500"
                        onClick={() => {}}
                      >
                        <PencilIcon className="size-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => {}}
                      >
                        <Trash2Icon className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>

            {isLoading && (
              <TableCaption className="mb-4">Loading...</TableCaption>
            )}

            {!isLoading && transactions?.data?.length === 0 && (
              <TableCaption className="mb-4">No Transaction Found</TableCaption>
            )}
          </Table>
        </CardContent>
      </Card>
    </Fragment>
  );
}
