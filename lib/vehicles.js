import data from "@/data/vehicles.json";
import overrides from "@/data/assembly-overrides.json";

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Normalize override keys to `${makeSlug}|${modelSlug}` so "tesla|model 3" and
// "tesla|model-3" both resolve correctly regardless of how they were written.
const overrideMap = new Map(
  Object.entries(overrides).map(([key, val]) => {
    const [mk, ...rest] = key.split("|");
    return [`${slugify(mk)}|${slugify(rest.join("|"))}`, val];
  })
);

export const vehicles = data.map((v) => {
  const makeSlug = slugify(v.make);
  const modelSlug = slugify(v.model);
  const ov = overrideMap.get(`${makeSlug}|${modelSlug}`) || {};
  return {
    year: v.year,
    make: v.make,
    model: v.model,
    bodyClass: ov.bodyClass ?? v.bodyClass ?? "",
    assembly: ov.assembly ?? v.assembly ?? "mixed",
    plants: ov.plants ?? v.plants ?? [],
    note:
      ov.note ?? v.note ?? "Assembly varies — verify your exact vehicle with the VIN checker.",
    makeSlug,
    modelSlug,
  };
});

export function getAllParams() {
  return vehicles.map((v) => ({ year: String(v.year), make: v.makeSlug, model: v.modelSlug }));
}

export function getVehicle(year, make, model) {
  return vehicles.find(
    (v) => String(v.year) === String(year) && v.makeSlug === make && v.modelSlug === model
  );
}

export function getMakes() {
  const m = new Map();
  for (const v of vehicles) {
    const cur = m.get(v.makeSlug) || { make: v.make, makeSlug: v.makeSlug, count: 0 };
    cur.count++;
    m.set(v.makeSlug, cur);
  }
  return [...m.values()].sort((a, b) => b.count - a.count || a.make.localeCompare(b.make));
}

export function getMakeParams() {
  return getMakes().map((m) => ({ make: m.makeSlug }));
}

export function getByMake(makeSlug) {
  return vehicles
    .filter((v) => v.makeSlug === makeSlug)
    .sort((a, b) => b.year - a.year || a.model.localeCompare(b.model));
}

export function makeName(makeSlug) {
  const v = vehicles.find((x) => x.makeSlug === makeSlug);
  return v ? v.make : makeSlug;
}
