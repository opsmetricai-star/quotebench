import { notFound } from "next/navigation";

const DOCS: Record<string, { title: string; sections: [string, string][] }> = {
  terms: {
    title: "Terms of Service",
    sections: [
      ["Service", "QuoteBench provides AI-assisted software pricing benchmarks, contract analysis and negotiation planning to business customers."],
      ["Nature of the output", "Benchmarks are AI-generated market estimates combined with calculations on the data you submit. They are decision support, not legal, financial or procurement advice, and they are not verified transaction data. You remain responsible for your purchasing decisions."],
      ["Accounts and acceptable use", "You are responsible for activity on your account and for the accuracy of the content you submit. You must have the right to upload any contract you submit."],
      ["Plans and payment", "Paid plans are purchased through Selar. A plan is activated after the payment is verified. Usage limits apply per plan each calendar month."],
      ["Availability", "We work to keep the service available but do not guarantee uninterrupted access. AI features depend on third-party model availability."],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      ["What we collect", "Account details (name, company, email), the quotes, contracts and notes you submit, and usage counts needed to apply plan limits."],
      ["How we use it", "To run your workspace and to generate benchmarks, audits and negotiation plans. Submitted text is sent to our AI provider for that purpose only."],
      ["Subprocessors", "Supabase (authentication, database, storage), Google (Gemini AI processing), Vercel (hosting) and Selar (payment checkout)."],
      ["Cookies", "We use essential cookies to keep you signed in. We do not set advertising cookies."],
      ["Your rights", "You can view and edit your profile in Settings."],
    ],
  },
  security: {
    title: "Security",
    sections: [
      ["Data isolation", "Every table is protected by row level security so each account can read and write only its own records."],
      ["Contract storage", "Uploaded contracts are stored in a private bucket, in a folder scoped to the uploading user."],
      ["AI governance", "Model calls run on the server only. Keys are never sent to the browser, and model output is validated against a strict schema before it is saved."],
      ["Usage controls", "Plan limits are enforced on the server using records that users cannot edit."],
      ["Payments", "Plan activation requires verification of the payment. A redirect from checkout never grants access on its own."],
    ],
  },
};

export function generateStaticParams() { return Object.keys(DOCS).map((slug) => ({ slug })); }

export default async function Legal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DOCS[slug];
  if (!d) notFound();
  return (
    <article className="mx-auto max-w-[760px] px-5 py-20">
      <h1 className="h1">{d.title}</h1>
      <div className="mt-10 space-y-8">
        {d.sections.map(([h, p]) => (
          <section key={h}><h2 className="text-xl font-medium text-ink">{h}</h2><p className="mt-2 text-lg leading-relaxed">{p}</p></section>
        ))}
      </div>
    </article>
  );
}
