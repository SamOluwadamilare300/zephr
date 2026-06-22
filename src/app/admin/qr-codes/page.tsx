import { QrGenerator } from "@/components/qr-generator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "QR Codes | Zephyr Admin" };

export default function QrCodesPage() {
  return (
    <div className="min-h-screen bg-bg p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin" className="flex items-center gap-1 text-sm text-ink/60 hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-extrabold text-ink">Poster QR Codes</h1>
        <p className="mt-1 text-sm text-ink/60">
          Generate a QR code for each physical poster location. Download the SVG for
          anything going to print, PNG is fine for digital/WhatsApp flyers.
        </p>
        <div className="mt-6">
          <QrGenerator />
        </div>
      </div>
    </div>
  );
}
