import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "@/features/transaction/action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const createTransactionSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  type: z.enum(["income", "expense"], {
    error: "Type is required",
  }),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
});

export default function CreateTransactionCard(refetch: {
  refetch: () => void;
}) {
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: "",
      type: "income",
      category: "",
      date: "",
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof createTransactionSchema>) => {
      const formattedData = {
        ...data,
        amount: parseFloat(data.amount), // Convert amount to number
      };

      return createTransaction(formattedData);
    },
    onSuccess: () => {
      form.reset(); // Reset the form after successful submission
      refetch.refetch(); // Refetch the transactions after successful submission
      toast.success('Transaction created successfully!');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to create transaction");
    },
  })

  const onSubmit = (data: z.infer<typeof createTransactionSchema>) => {
    mutate(data);
  };

  return (
    <Card className="w-full gap-2">
      <CardHeader className="gap-0">
        <CardTitle>Create Transaction</CardTitle>
        <CardDescription>Add a new finnacsial activity...</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    onChange={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
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

            <Button size="lg" type="submit" disabled={!form.formState.isValid || isPending}>
              {isPending ? "Creating..." : "Create Transaction"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
