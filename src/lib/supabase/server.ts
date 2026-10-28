import { ENVIRONMENT } from "@/config/environment";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  // return a server-side Supabase client with the provided environment variables and cookie store
  return createServerClient(
    ENVIRONMENT.supabaseUrl!,
    ENVIRONMENT.supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookieToSet) {
          try {
            cookieToSet.forEach(
              ({ name, value, options }) =>
                cookieStore.set(name, value, options), // set the cookie in the cookie store with the provided name, value, and options
            );
          } catch {}
        },
      },
    },
  );
};
