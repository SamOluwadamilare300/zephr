import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import { qrSources } from "../src/lib/content";
import { buildSourceUrl } from "../src/lib/qr";

// Usage:
//   npm run qr:generate                  -> generates the default poster locations
//   npm run qr:generate library hostel-c -> generates only the sources you list
//
// Output: qr-codes/<source>.png and qr-codes/<source>.svg
// PNG is sized for on-screen/standard print; SVG is vector and scales to any
// poster size with zero quality loss — prefer SVG for large-format printing.

const sources = process.argv.slice(2).length ? process.argv.slice(2) : qrSources;
const outDir = path.join(process.cwd(), "qr-codes");

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const source of sources) {
    const url = buildSourceUrl(source);

    const pngBuffer = await QRCode.toBuffer(url, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 1024,
      color: { dark: "#101412", light: "#FFFFFF" },
    });
    fs.writeFileSync(path.join(outDir, `${source}.png`), pngBuffer);

    const svgString = await QRCode.toString(url, {
      errorCorrectionLevel: "H",
      margin: 2,
      type: "svg",
      color: { dark: "#101412", light: "#FFFFFF" },
    });
    fs.writeFileSync(path.join(outDir, `${source}.svg`), svgString);

    console.log(`✓ ${source.padEnd(20)} -> ${url}`);
  }

  console.log(`\nDone. Files are in ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
