import Link from "next/link";

export function PageHero({ eyebrow, title, body, primary = ["Try for free", "/signup"], secondary = ["Get a demo", "/demo"] }: {
  eyebrow: string; title: React.ReactNode; body?: string; primary?: [string, string] | null; secondary?: [string, string] | null;
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-16 pt-20 text-center">
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="h1 mx-auto mt-6 max-w-[780px]">{title}</h1>
      {body && <p className="mx-auto mt-6 max-w-[600px] text-lg leading-relaxed">{body}</p>}
      {(primary || secondary) && (
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {primary && <Link href={primary[1]} className="btn btn-dark">{primary[0]}</Link>}
          {secondary && <Link href={secondary[1]} className="btn btn-line">{secondary[0]}</Link>}
        </div>
      )}
    </section>
  );
}

export function Split({ tag, title, body, bullets, flip, children }: {
  tag: string; title: string; body: string; bullets?: string[]; flip?: boolean; children: React.ReactNode;
}) {
  return (
    <div className={`grid items-center gap-12 md:grid-cols-2 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <div className="eyebrow">{tag}</div>
        <h2 className="h2 mt-4 max-w-[480px]">{title}</h2>
        <p className="mt-5 max-w-[470px] text-lg leading-relaxed">{body}</p>
        {bullets && (
          <ul className="mt-6 space-y-2.5">
            {bullets.map((b) => <li key={b} className="flex gap-3 text-[16px] text-ink"><span className="text-brand">✓</span>{b}</li>)}
          </ul>
        )}
      </div>
      <div className="rounded-[28px] bg-soft p-6 md:p-10">{children}</div>
    </div>
  );
}
