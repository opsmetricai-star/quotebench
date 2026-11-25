import { notFound } from "next/navigation";

const DOCS: Record<string, { title: string; body: string[] }> = {
  terms: { title: "Terms of Service", body: ["These are placeholder terms. Replace with counsel-reviewed terms before launch.", "QuoteBench provides AI-generated estimates for informational purposes. They are not financial, legal or procurement advice and are not verified transaction data."] },
  privacy: { title: "Privacy Policy", body: ["This is a placeholder policy. Replace with counsel-reviewed text before launch.", "We store your account details, the quotes and contracts you submit, and usage counts. Submitted text is sent to our AI provider to produce results."] },
  subprocessors: { title: "Subprocessors", body: ["Supabase (database, auth, storage), Google (Gemini AI), Vercel (hosting), Selar (checkout)."] },
  cookies: { title: "Cookie Policy", body: ["We use essential cookies for authentication sessions. No advertising cookies are set."] },
  dpa: { title: "Data Processing Addendum", body: ["Placeholder. Provide a counsel-reviewed DPA before onboarding business customers."] },
  security: { title: "Security", body: ["Row Level Security restricts every table to the owning user.", "Contract files are stored in a private bucket with per-user folders.", "AI and service keys are server-side only.", "QuoteBench does not currently hold SOC 2 or similar certifications."] },
};

export function generateStaticParams() { return Object.keys(DOCS).map((slug) => ({ slug })); }

export default async function Legal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DOCS[slug];
  if (!d) notFound();
  return (
    <article className="mx-auto max-w-[760px] px-5 py-20">
      <h1 className="h1">{d.title}</h1>
      <div className="mt-8 space-y-4 text-lg leading-relaxed">{d.body.map((p) => <p key={p}>{p}</p>)}</div>
    </article>
  );
}
