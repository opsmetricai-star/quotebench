import { CtaBand } from "@/components/Shell";
import { PageHero, Split } from "@/components/Page";
import { Compare, Faq, Steps, UseCases } from "@/components/Sections";
import { BenchmarkMock, NegotiationMock } from "@/components/Mocks";
import { HOME_FAQ } from "@/lib/content";

export const metadata = { title: "How it works | QuoteBench" };

export default function HowItWorks() {
  return (
    <>
      <PageHero eyebrow="How it works" title="An AI engine for every step between quote and signature." body="QuoteBench analyzes, predicts, decides and automates, with your team approving each move." />
      <Steps />
      <section className="mx-auto max-w-[1200px] space-y-24 px-5 pb-24">
        <Split tag="ANALYZE AND PREDICT" title="Pricing and leverage in one pass" body="Every line item is priced against the market for your seat count and term. In the same pass, the model scores the levers a supplier is most likely to concede on." bullets={["Blended unit price and savings gap in dollars", "Ranked negotiation levers", "Confidence rating on every result"]}><BenchmarkMock /></Split>
        <Split flip tag="DECIDE AND AUTOMATE" title="A plan your team can run today" body="Quinn sets the target, sequences the steps, lists the non-price concessions to request and drafts the first email. You approve and send." bullets={["Target price and fallback position", "Drafted outreach ready for your signature", "Status tracking through to a closed price"]}><NegotiationMock /></Split>
      </section>
      <UseCases />
      <Compare />
      <Faq items={HOME_FAQ} />
      <CtaBand />
    </>
  );
}
