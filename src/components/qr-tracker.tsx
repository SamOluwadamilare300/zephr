"use client";

import { useEffect } from "react";
import { recordQrScan } from "@/lib/actions";

// Reads ?source=... from the URL (set on each physical poster's QR code)
// and records a single scan event per visit using a lightweight,
// non-identifying browser fingerprint stored in localStorage.
export function QrTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source");
    if (!source) return;

    let fingerprint = localStorage.getItem("zephyr_fp");
    if (!fingerprint) {
      fingerprint = crypto.randomUUID();
      localStorage.setItem("zephyr_fp", fingerprint);
    }

    const key = `zephyr_scan_${source}`;
    if (sessionStorage.getItem(key)) return; // avoid double-counting within a session
    sessionStorage.setItem(key, "1");

    recordQrScan(source, fingerprint);
  }, []);

  return null;
}
