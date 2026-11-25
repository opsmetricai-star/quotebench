import { PageHero } from "@/components/Page";
import { CtaBand } from "@/components/Shell";
import { Marketplace } from "@/components/Marketplace";

export const metadata = { title: "Marketplace | QuoteBench" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Marketplace" title="Check the price of any software before you buy" primary={null} secondary={null} />
      <Marketplace />
      <CtaBand />
    </>
  );
}
