import { Trophy } from "lucide-react";
import { getLeaderboard } from "@/lib/actions";

export async function Leaderboard() {
  const rows = await getLeaderboard();

  return (
    <div className="mx-auto mt-16 w-full max-w-md">
      <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-ink">
        <Trophy className="h-5 w-5 text-accent" /> Top Ambassadors
      </h3>
      {rows.length === 0 ? (
        <p className="mt-4 text-center text-sm text-ink/50">
          No ambassadors yet — be the first to join the leaderboard.
        </p>
      ) : (
        <ol className="mt-4 space-y-2">
          {rows.map((r, i) => (
            <li key={r.id} className="flex items-center justify-between rounded-lg bg-white px-4 py-2 text-sm">
              <span className="flex items-center gap-3">
                <span className="font-bold text-primary">#{i + 1}</span>
                {r.nickname || r.name}
              </span>
              <span className="font-semibold text-secondary">{r.referralCount} referrals</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
