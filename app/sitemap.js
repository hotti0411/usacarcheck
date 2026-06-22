import { vehicles, getMakes } from "@/lib/vehicles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

export default function sitemap() {
  const staticPages = ["", "models/", "eligibility/", "privacy/", "disclosure/"].map((p) => ({
    url: `${BASE}/${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.6,
  }));

  const makePages = getMakes().map((m) => ({
    url: `${BASE}/make/${m.makeSlug}/`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const modelPages = vehicles.map((v) => ({
    url: `${BASE}/${v.year}/${v.makeSlug}/${v.modelSlug}/`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...makePages, ...modelPages];
}
