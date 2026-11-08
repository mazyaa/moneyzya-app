export type Transactions ={
    id: string;
    date: string | Date;
    description: string;
    category: string;
    amount: number;
    type: "income" | "expense";
    user_id: string;
    embedding: number[] | null;
}