import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { recordReferralVisit } from "@/lib/actions";
import { nanoid } from "nanoid";

// A referral landing page. We attribute the visit to the ambassador,
// drop a fingerprint cookie so later conversions (WhatsApp join,
// becoming an ambassador themselves) can still be traced back, then
// send the visitor straight into the main experience.
export default async function SupportPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const cookieStore = await cookies();

  let fingerprint = cookieStore.get("zephyr_fp")?.value;
  if (!fingerprint) {
    fingerprint = nanoid(12);
  }

  await recordReferralVisit(username, fingerprint);

  redirect(`/?source=ambassador-${username}`);
}
