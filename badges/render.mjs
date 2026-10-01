// Renders the org profile's product badges as Cut-format SVGs (dev-standards/ICON_STYLE.md, §10).
// Run: node badges/render.mjs   (the badges workflow runs it on a schedule and commits the result)
import { writeFileSync, mkdirSync } from "node:fs";

// Each product's status is set by hand here; its version comes from its latest GitHub release,
// and its icon is copied from `icon` in its repo (products without one show icons/coming-soon.svg).
const PRODUCTS = [
  { repo: "lineage", status: "stable", icon: "src-tauri/icons/icon.svg" },
  { repo: "fennec", status: "beta", icon: "assets/app-icon.svg" },
  { repo: "img2text", status: "stable" },
  { repo: "InstantNotes", status: "beta", icon: "src-tauri/icons/icon.svg" },
];

const PAPER = "#F3F0E6";
const ACCENT = "#F5C400";
const PALETTE = {
  version: { plate: "#5A6570", shadow: "#12171C" }, // Anvil Slate
  stable: { plate: "#1664D0", shadow: "#081A40", accent: true }, // Lineage Blue
  beta: { plate: "#9C5617", shadow: "#2E1600" }, // Kiln Amber
};
const H = 20;
const PAD = 7;
const FONT = `font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="11" font-weight="700"`;

const headers = { Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function latestVersion(repo) {
  const base = `https://api.github.com/repos/Jam-Sw/${repo}/releases`;
  const latest = await fetch(`${base}/latest`, { headers });
  if (latest.ok) return (await latest.json()).tag_name;
  // No full release yet: fall back to the newest pre-release.
  const list = await fetch(`${base}?per_page=1`, { headers });
  const tag = list.ok ? (await list.json())[0]?.tag_name : undefined;
  if (!tag) throw new Error(`${repo}: no GitHub release found (HTTP ${latest.status}/${list.status})`);
  return tag;
}

// icons follow the ICON_STYLE.md §2.1 plate.
async function sourceIcon(repo, path) {
  const res = await fetch(`https://api.github.com/repos/Jam-Sw/${repo}/contents/${path}`, {
    headers: { ...headers, Accept: "application/vnd.github.raw" },
  });
  if (!res.ok) throw new Error(`${repo}: icon ${path} not found (HTTP ${res.status})`);
  return res.text();
}

// A 2-tone segment (§3): flat plate plus a lower-right shadow facet of ~30% area.
function segment(x, w, { plate, shadow, accent }) {
  return [
    `<rect x="${x}" width="${w}" height="${H}" fill="${plate}"/>`,
    `<polygon points="${x + w * 0.4},${H} ${x + w},0 ${x + w},${H}" fill="${shadow}"/>`,
    accent ? `<polygon points="${x},0 ${x + 7},0 ${x},6" fill="${ACCENT}"/>` : "",
  ].join("");
}

function label(x, w, text, spacing) {
  const len = text.length * spacing;
  return `<text x="${x + w / 2}" y="14" text-anchor="middle" textLength="${len}" lengthAdjust="spacingAndGlyphs" fill="${PAPER}" ${FONT}>${text}</text>`;
}

function badge(version, status) {
  const word = status.toUpperCase();
  const vw = Math.round(version.length * 6.2 + PAD * 2);
  const sw = Math.round(word.length * 7.4 + PAD * 2);
  const w = vw + sw;
  const freq = (220 / w).toFixed(3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${H}" viewBox="0 0 ${w} ${H}" role="img" aria-label="${version} ${status}">
<title>${version} ${status}</title>
<defs>
<clipPath id="badge"><rect width="${w}" height="${H}" rx="4"/></clipPath>
<filter id="grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="3" stitchTiles="stitch" result="noise"/>
  <feColorMatrix in="noise" type="matrix" result="gray"
    values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"/>
  <feComponentTransfer in="gray" result="stipple">
    <feFuncR type="linear" slope="1.45" intercept="-0.22"/>
    <feFuncG type="linear" slope="1.45" intercept="-0.22"/>
    <feFuncB type="linear" slope="1.45" intercept="-0.22"/>
  </feComponentTransfer>
  <feBlend in="SourceGraphic" in2="stipple" mode="overlay" result="printed"/>
  <feComposite in="printed" in2="SourceGraphic" operator="in"/>
</filter>
</defs>
<g clip-path="url(#badge)" filter="url(#grain)">${segment(0, vw, PALETTE.version)}${segment(vw, sw, PALETTE[status])}</g>
${label(0, vw, version, 6.2)}${label(vw, sw, word, 7.4)}
</svg>
`;
}

const outDir = new URL("../profile/badges/", import.meta.url);
const iconDir = new URL("../profile/icons/", import.meta.url);
mkdirSync(outDir, { recursive: true });
mkdirSync(iconDir, { recursive: true });
for (const { repo, status, icon } of PRODUCTS) {
  const id = repo.toLowerCase();
  const version = await latestVersion(repo);
  writeFileSync(new URL(`${id}.svg`, outDir), badge(version, status));
  if (icon) writeFileSync(new URL(`${id}.svg`, iconDir), await sourceIcon(repo, icon));
  console.log(`${repo}: ${version} ${status}${icon ? " + icon" : ""}`);
}
