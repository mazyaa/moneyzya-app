import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect, useState } from "react";
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
  // refetch,
  page,
  limit,
  search,
  setPage,
  setLimit,
  setSearch,
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
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        // Only update search if it has changed
        setSearch(localSearch);
        setPage(1); // Reset to first page when search changes
      }
    }, 500);

    return () => clearTimeout(timer); // Cleanup the timer on unmount or when localSearch changes
  });

  return (
    <Fragment>
      <Card className="w-full gap-4">
        <CardHeader className="flex flex-col md:flex-row justify-between gap-2 md:items-center">
          <div className="flex flex-col gap-1 w-4/5">
            <CardTitle>Recent Transacation</CardTitle>
            <CardDescription>Your Latest financial activities</CardDescription>
          </div>

          <Input
            placeholder="Search..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
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

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Rows per page</div>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  setPage(1); // Reset to first page when limit changes
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder={limit.toString()} />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {[1, 10, 20, 50, 100].map((size) => (
                      <SelectItem key={`limit-${size}`} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {transactions?.totalPages && transactions?.totalPages > 1 ? (
              <Pagination className="w-auto mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        page === 1
                          ? setPage(Number(transactions?.totalPages)) // if the current page is the first page, go to the last page
                          : setPage(page - 1)
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        page === Number(transactions?.totalPages) // if the current page is the last page, go back to the first page
                          ? setPage(1)
                          : setPage(page + 1)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : (
              ''
            )}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}
