import { Button } from "@/components/ui/button";
import { CoinsIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
    title: "Moneyzya App",
    description: "Your Personal finnance app with AI :)",
  }
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen">
      <CoinsIcon className="text-main size-24" />
      <h1 className="text-2xl font-bold text-main">
        Welcome to Moneyzya App
      </h1>
      <p className="underline">Your Personal finnance app with AI</p>
      <Link href="/dashboard" className="mt-5">
        <Button
          size="lg"
          className="rounded-xl bg-main text-white cursor-pointer"
        >
          Get Strated
        </Button>
      </Link>
    </main>
  );
}
