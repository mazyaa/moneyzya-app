import { Transaction } from "@/app/types/transaction";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateTransaction } from "@/features/transaction/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateTransactionSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  type: z.enum(["income", "expense"], {
    error: "Type is required",
  }),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

export default function UpdateTransactionDialog({
  selectedTransaction,
  setSelectedTransaction,
  refetch,
}: {
  selectedTransaction: {
    data: Omit<Transaction, "user_id" | "embedding">;
    action: "delete" | "update";
  } | null;
  setSelectedTransaction: Dispatch<
    SetStateAction<{
      data: Omit<Transaction, "user_id" | "embedding">;
      action: "delete" | "update";
    } | null>
  >;
  refetch: () => void;
}) {
  const form = useForm<z.infer<typeof updateTransactionSchema>>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      amount: selectedTransaction
        ? String(selectedTransaction.data.amount)
        : "",
      type: selectedTransaction ? selectedTransaction.data.type : "income",
      category: selectedTransaction ? selectedTransaction.data.category : "",
      date: selectedTransaction ? String(selectedTransaction.data.date) : "",
      description: selectedTransaction
        ? selectedTransaction.data.description
        : "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: z.infer<typeof updateTransactionSchema>;
    }) => {
      const formattedData = {
        ...data,
        amount: parseFloat(data.amount), // Convert amount to number
      };
      return updateTransaction(id, formattedData);
    },
    onSuccess: () => {
      setSelectedTransaction(null);
      refetch();
      form.reset();
      toast.success("Transaction updated successfully!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update transaction",
      );
    },
  });

  useEffect(() => {
    if (selectedTransaction) {
      form.reset({
        // use form.reset to set the form values to the selected transaction data
        amount: String(selectedTransaction.data.amount),
        type: selectedTransaction.data.type,
        category: selectedTransaction.data.category,
        date: String(selectedTransaction.data.date),
        description: selectedTransaction.data.description,
      });
    }
  }, [selectedTransaction, form]);

  const onSubmit = (data: z.infer<typeof updateTransactionSchema>) => {
    if (selectedTransaction) {
      mutate({ id: String(selectedTransaction.data.id), data });
    }
  };

  return (
    <Dialog
      open={!!selectedTransaction && selectedTransaction.action === "update"}
      onOpenChange={() => setSelectedTransaction(null)} // set selectedTransaction to null when the dialog is closed
    >
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="gap-4">
            <div className="flex flex-col gap-2">
              <DialogTitle>Update Transaction</DialogTitle>
              <DialogDescription>
                Update the details of the transaction below. Make sure to fill
                in all required fields.
              </DialogDescription>
            </div>

            <FieldGroup className="gap-3">
              <Controller
                control={form.control}
                name="amount"
                render={(
                  { field, fieldState }, // use fieldState to access validation errors and use field to bind the input value and onChange handler
                ) => (
                  <Field className="gap-1">
                    <FieldLabel htmlFor="form-amount">Amount</FieldLabel>
                    <Input
                      {...field}
                      id="form-amount"
                      placeholder="0.00"
                      autoComplete="off"
                      type="number"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="type"
                render={(
                  { field, fieldState }, // use fieldState to access validation errors and use field to bind the input value and onChange handler
                ) => (
                  <Field className="gap-1">
                    <FieldLabel htmlFor="form-type">Type</FieldLabel>
                    <Select
                      onValueChange={field.onChange} // use field.onChange to update the form state when the select value changes
                      value={field.value}
                    >
                      <SelectTrigger id="form-type">
                        <SelectValue placeholder="Select type" />
                        <SelectContent>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="category"
                render={(
                  { field, fieldState }, // use fieldState to access validation errors and use field to bind the input value and onChange handler
                ) => (
                  <Field className="gap-1">
                    <FieldLabel htmlFor="form-category">Category</FieldLabel>
                    <Select
                      onValueChange={field.onChange} // use field.onChange to update the form state when the select value changes
                      value={field.value}
                    >
                      <SelectTrigger id="form-category">
                        <SelectValue placeholder="Select category" />
                        <SelectContent>
                          <SelectItem value="food & drink">
                            Food & Drink
                          </SelectItem>
                          <SelectItem value="transportation">
                            Transportation
                          </SelectItem>
                          <SelectItem value="entertainment">
                            Entertainment
                          </SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="housing">Housing</SelectItem>
                          <SelectItem value="salary">Salary</SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="date"
                render={(
                  { field, fieldState }, // use fieldState to access validation errors and use field to bind the input value and onChange handler
                ) => (
                  <Field className="gap-1">
                    <FieldLabel htmlFor="form-date">Date</FieldLabel>
                    <DatePicker
                      id="form-date"
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(date) =>
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                      }
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="description"
                render={(
                  { field, fieldState }, // use fieldState to access validation errors and use field to bind the input value and onChange handler
                ) => (
                  <Field className="gap-1">
                    <FieldLabel htmlFor="form-description">
                      Description
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-description"
                      placeholder="Enter description"
                      autoComplete="off"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedTransaction(null)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              size="lg"
              type="submit"
              disabled={!form.formState.isValid || isPending}
            >
              {isPending ? "Updating..." : "Update Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
