import { PageHero } from "@/components/Page";
import { DemoForm } from "@/components/DemoForm";

export const metadata = { title: "Get a demo | QuoteBench" };

export default function Demo() {
  return (
    <>
      <PageHero eyebrow="Get a demo" title="See QuoteBench on your own quote" primary={null} secondary={null} />
      <section className="mx-auto max-w-[520px] px-5 pb-24"><DemoForm /></section>
    </>
  );
}
