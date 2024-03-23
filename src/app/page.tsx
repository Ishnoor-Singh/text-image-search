import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import LandingPageContent from "./LandingPageContent";

export default async function Home() {
  const session = await getSession()
  if (session?.user) {
    redirect("/application")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <LandingPageContent />
      </div>
    </main>
  );
}
