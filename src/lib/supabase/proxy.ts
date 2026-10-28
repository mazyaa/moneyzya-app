import { ENVIRONMENT } from "@/config/environment";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const supabaseProxy = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers, // get the headers from the incoming request
    },
  });

  const supabase = createServerClient(
    ENVIRONMENT.supabaseUrl!,
    ENVIRONMENT.supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookieToSet) {
          cookieToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          ); // set the cookie in the cookie store with the provided name, value
          supabaseResponse = NextResponse.next({
            request,
          });
          cookieToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          ); // set the cookie in the cookie store with the provided name, value, and options
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If the user is not authenticated and the request is not for the login page, redirect to the login page
  if (!user && !request.nextUrl.pathname.startsWith("/login")) {
    // const url = request.nextUrl.clone(); // clone the request URL to modify it for redirection
    // url.pathname = "/login";
    // return NextResponse.redirect(url);
  }

  return supabaseResponse;
};
