// Expand data/vehicles.json using the free NHTSA vPIC API (no key).
// Run: npm run data
//
// What this does now: pulls the model list for the makes/years below and ADDS any
// missing models (tagged assembly:"mixed" → the site shows "depends on your VIN, check below",
// which is the honest default until enriched).
//
// Next data step (for accurate per-model verdicts): enrich each model's assembly from the
// NHTSA AALA (American Automobile Labeling Act) annual final-assembly report. The live VIN
// checker is always authoritative regardless.

import { readFile, writeFile } from "node:fs/promises";

const MAKES = ["Honda", "Toyota", "Ford", "Chevrolet", "Tesla", "Subaru", "Hyundai", "Jeep"];
const YEARS = [2025, 2026];
const DATA_PATH = "./data/vehicles.json";

function slugify(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function modelsFor(make, year) {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(
    make
  )}/modelyear/${year}?format=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  const json = await res.json();
  return (json.Results || []).map((r) => r.Model_Name);
}

const existing = JSON.parse(await readFile(DATA_PATH, "utf8"));
const seen = new Set(existing.map((v) => `${v.year}|${slugify(v.make)}|${slugify(v.model)}`));
let added = 0;

for (const year of YEARS) {
  for (const make of MAKES) {
    let models = [];
    try {
      models = await modelsFor(make, year);
    } catch (e) {
      console.warn(`  ! ${year} ${make}: ${e.message}`);
      continue;
    }
    for (const model of models) {
      const key = `${year}|${slugify(make)}|${slugify(model)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      existing.push({
        year,
        make,
        model,
        assembly: "mixed",
        bodyClass: "",
        plants: [],
        note: "Assembly varies — verify your exact vehicle with the VIN checker.",
      });
      added++;
    }
    console.log(`  ${year} ${make}: ${models.length} models`);
  }
}

await writeFile(DATA_PATH, JSON.stringify(existing, null, 2) + "\n", "utf8");
console.log(`\nDone. Added ${added} new models. Total: ${existing.length}.`);
