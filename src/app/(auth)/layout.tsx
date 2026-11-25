import { Suspense } from "react";
import { Footer, Header } from "@/components/Shell";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-soft"><Suspense>{children}</Suspense></main>
      <Footer />
    </>
  );
}
