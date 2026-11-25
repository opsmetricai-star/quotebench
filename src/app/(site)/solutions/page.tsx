import { CtaBand } from "@/components/Shell";
import { PageHero } from "@/components/Page";
import { SolutionsTeaser, UseCases } from "@/components/Sections";

export const metadata = { title: "Solutions | QuoteBench" };

export default function Solutions() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="One AI engine, built around how each team buys software." body="Procurement, finance and IT each own a different part of software spend. QuoteBench gives each the analysis and the execution they need." />
      <SolutionsTeaser />
      <UseCases />
      <CtaBand />
    </>
  );
}
