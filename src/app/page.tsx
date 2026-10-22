import { Button } from "@/components/ui/button";
import { CoinsIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen">
      <CoinsIcon className="text-lime-700 size-24" />
      <h1 className="text-2xl font-bold text-lime-700">
        Welcome to Moneyzya App
      </h1>
      <p className="underline">Your Personal finnance app with AI</p>
      <Link href="/" className="mt-5">
        <Button
          size="lg"
          className="rounded-xl bg-lime-700 text-white cursor-pointer"
        >
          Get Strated
        </Button>
      </Link>
    </main>
  );
}
