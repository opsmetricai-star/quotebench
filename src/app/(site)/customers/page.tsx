import { PageHero } from "@/components/Page";
import { CtaBand } from "@/components/Shell";

export const metadata = { title: "Customers | QuoteBench" };

export default function Customers() {
  return (
    <>
      <PageHero eyebrow="Customers" title="Customer stories are on the way" body="QuoteBench is new. We will publish stories here once customers have approved them, with real numbers and real names." primary={["Be an early customer", "/signup"]} secondary={null} />
      <section className="mx-auto grid max-w-[1000px] gap-5 px-5 pb-24 md:grid-cols-3">
        {["Finance team renewing a CRM", "IT lead consolidating tools", "Founder buying first security stack"].map((t) => (
          <div key={t} className="card p-7"><div className="eyebrow">Coming soon</div><h2 className="mt-3 text-lg font-medium text-ink">{t}</h2></div>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
