-- setup vector database
CREATE EXTENSION IF NOT EXISTS vector;

-- create table transactions
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY, -- use gen_random_uuid() to generate a random UUID for the primary key
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')), -- type can only be 'income' or 'expense'
    category TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    description TEXT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    embedding VECTOR(768), -- embedding column for vector representation of the transaction
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- activation RLS (Row Level Security) for transactions table
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- create policy for all users to access their own transactions
CREATE POLICY "Permissive rules for all" ON public.transactions
    FOR ALL USING (true);

-- if have been created auth system
-- CREATE POLICY "Users can manage their own transactions" ON public.transactions
--     FOR ALL USING (auth.uid() = user_id);