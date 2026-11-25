import { PageHero } from "@/components/Page";
import { CtaBand } from "@/components/Shell";
import { Marketplace } from "@/components/Marketplace";

export const metadata = { title: "Marketplace | QuoteBench" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Marketplace" title="Price any software contract before you sign it" cta={false} />
      <Marketplace />
      <CtaBand />
    </>
  );
}
