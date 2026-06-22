import { getAdminOverview } from "@/lib/admin-data";
import { logout } from "@/lib/admin-auth";

export const metadata = { title: "Admin Dashboard | Zephyr Campaign" };

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl2 border border-primary/10 bg-white p-5">
      <p className="text-2xl font-extrabold text-primary">{value}</p>
      <p className="mt-1 text-xs font-medium text-ink/60">{label}</p>
    </div>
  );
}

export default async function AdminPage() {
  const data = await getAdminOverview();
  const conversionRate = data.totalScans > 0 ? Math.round((data.ambassadorSignups / data.totalScans) * 100) : 0;

  return (
    <div className="min-h-screen bg-bg p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Campaign Dashboard</h1>
            <p className="text-sm text-ink/60">QR scans, ambassador growth, and submitted questions.</p>
          </div>
          <div className="flex items-center gap-2">
            <a href="/admin/qr-codes" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-secondary">
              Generate QR Codes
            </a>
            <form action={logout}>
              <button className="rounded-full border border-primary/20 px-4 py-2 text-sm font-medium">Log out</button>
            </form>
          </div>
        </div>

        {!data.connected && (
          <p className="mt-6 rounded-xl2 border border-dashed border-primary/30 bg-white p-4 text-sm text-ink/60">
            No database connected yet — set <code className="font-mono">DATABASE_URL</code> and run{" "}
            <code className="font-mono">npm run db:push</code> to see live analytics here.
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Total QR Scans" value={data.totalScans} />
          <StatCard label="Unique Scans" value={data.uniqueScans} />
          <StatCard label="WhatsApp Joins (from QR)" value={data.whatsappJoins} />
          <StatCard label="Conversion Rate" value={`${conversionRate}%`} />
          <StatCard label="Total Ambassadors" value={data.ambassadorCount} />
          <StatCard label="Total Referral Visits" value={data.referralCount} />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl2 border border-primary/10 bg-white p-5">
            <h2 className="font-bold text-ink">Top-Performing QR Locations</h2>
            {data.topSources.length === 0 ? (
              <p className="mt-3 text-sm text-ink/50">No scans recorded yet.</p>
            ) : (
              <ol className="mt-3 space-y-2">
                {data.topSources.map((s, i) => (
                  <li key={s.source} className="flex justify-between text-sm">
                    <span>#{i + 1} {s.source}</span>
                    <span className="font-semibold text-primary">{s.count}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="rounded-xl2 border border-primary/10 bg-white p-5">
            <h2 className="font-bold text-ink">Recent Questions</h2>
            {data.recentQuestions.length === 0 ? (
              <p className="mt-3 text-sm text-ink/50">No questions submitted yet.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {data.recentQuestions.map((q) => (
                  <li key={q.id} className="border-b border-primary/5 pb-2 text-sm last:border-0">
                    <p className="text-ink">{q.question}</p>
                    <p className="mt-1 text-xs text-ink/50">
                      {q.name || "Anonymous"} {q.department ? `· ${q.department}` : ""} · {q.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
