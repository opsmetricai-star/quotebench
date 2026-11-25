import { BenchmarkTool } from "@/components/BenchmarkTool";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Benchmarks() {
  const supabase = await createClient();
  const { data } = await supabase.from("benchmarks").select("id,supplier,purchase_type,quoted_total,result,created_at").order("created_at", { ascending: false }).limit(20);
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium tracking-tight text-ink">Benchmarks</h1>
      <BenchmarkTool />
      <div className="card p-6"><div className="eyebrow mb-3">History</div>
        {(data ?? []).length === 0 ? <p className="text-sm text-muted">No benchmarks yet.</p> :
          <div className="overflow-x-auto"><table className="w-full text-left text-[15px]"><thead className="text-xs text-muted"><tr><th className="py-2">Supplier</th><th>Type</th><th>Quoted</th><th>Savings</th><th>Date</th><th /></tr></thead><tbody>
            {(data ?? []).map((b) => (<tr key={b.id} className="border-t border-line"><td className="py-2.5 text-ink">{b.supplier}</td><td>{b.purchase_type}</td><td>${Math.round(Number(b.quoted_total)).toLocaleString()}</td>
              <td>${Math.round((b.result as { potentialSavings?: number }).potentialSavings ?? 0).toLocaleString()}</td><td>{new Date(b.created_at).toLocaleDateString()}</td>
              <td><Link className="text-brand" href={`/app/negotiations?benchmark=${b.id}`}>Plan →</Link></td></tr>))}</tbody></table></div>}</div>
    </div>
  );
}
