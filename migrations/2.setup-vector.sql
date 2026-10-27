CREATE OR REPLACE FUNCTION match_transactions (
    query_embedding VECTOR(768),
    match_threshold float, -- the minimum similarity score for a match to be considered valid some respponse from model
    match_count int -- the maximum number of matches to return
)

-- returns a table of transactions that match the given query embedding, ordered by similarity score
RETURNS TABLE (
    id uuid,
    type text,
    category text,
    amount numeric,
    description text,
    date date,
    user_id uuid,
    similarity float
)

LANGUAGE sql STABLE -- use stable to indicate that the function does not modify the database and will return the same result for the same input
AS $$
  SELECT
    transactions.id,
    transactions.type,
    transactions.category,
    transactions.amount,
    transactions.description,
    transactions.date,
    transactions.user_id,
    1 - (transactions.embedding <=> query_embedding) AS similarity -- calculate similarity score using the <=> operator and compare transaction embedding with query embedding
  FROM transactions
  WHERE  1 - (transactions.embedding <=> query_embedding) > match_threshold -- filter results based on the match threshold
  ORDER BY transactions.embedding <=> query_embedding -- order results by similarity score
  LIMIT match_count; -- limit the number of results returned to the specified match count
$$;