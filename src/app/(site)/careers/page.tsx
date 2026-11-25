import { PageHero } from "@/components/Page";

export const metadata = { title: "Careers | QuoteBench" };

export default function Careers() {
  return <PageHero eyebrow="Careers" title="No open roles right now" body="We are a small team. When we hire, roles will be listed here." primary={null} secondary={["Contact us", "/demo"]} />;
}
