// PoC: Car Loan Interest Deduction (OBBBA 2025–2028) — vehicle-side eligibility checker
// Data source: NHTSA vPIC DecodeVinValues (free, public, no key)
// Run: node poc-vin-check.mjs

const VINS = [
  { vin: "1HGCM82633A004352", note: "Honda Accord (기대: USA/Ohio)" },
  { vin: "5YJ3E1EA7JF000316", note: "Tesla Model 3 (기대: USA)" },
  { vin: "JTMWFREV0HJ700000", note: "Toyota RAV4 (기대: 해외조립)" },
  { vin: "WBA5B3C50GD000000", note: "BMW 5-series (기대: Germany)" },
];

// OBBBA 적격 차종: 승용/SUV·미니밴·밴(MPV)/픽업(TRUCK)/오토바이, GVWR < 14,000 lb
const TYPE_OK = ["PASSENGER CAR", "MULTIPURPOSE", "MPV", "TRUCK", "MOTORCYCLE", "VAN"];
const TYPE_BAD = ["BUS", "TRAILER", "LOW SPEED", "OFF ROAD", "INCOMPLETE"];

function gvwrClass(gvwr) {
  const m = /Class\s+(\d+)/i.exec(gvwr || "");
  return m ? parseInt(m[1], 10) : null; // Class 1~3 = <=14,000 lb 적격
}

function typeQualifies(vt) {
  const t = (vt || "").toUpperCase();
  if (!t) return null;
  if (TYPE_BAD.some((k) => t.includes(k))) return false;
  return TYPE_OK.some((k) => t.includes(k));
}

async function decode(vin) {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const j = await res.json();
  return j.Results?.[0] ?? {};
}

function evaluate(r) {
  const reasons = [];
  const plant = (r.PlantCountry || "").toUpperCase();
  const usAssembled = plant.includes("UNITED STATES");
  if (!usAssembled) reasons.push(`최종조립 미국 아님 (${r.PlantCountry || "unknown"})`);

  const tq = typeQualifies(r.VehicleType);
  if (tq === false) reasons.push(`적격 차종 아님 (${r.VehicleType})`);

  const cls = gvwrClass(r.GVWR);
  const weightOk = cls === null ? null : cls <= 3;
  if (weightOk === false) reasons.push(`GVWR 14,000 lb 초과 (${r.GVWR})`);

  const eligible = usAssembled && tq !== false && weightOk !== false;
  return { eligible, reasons, usAssembled, cls, weightOk };
}

(async () => {
  for (const { vin, note } of VINS) {
    try {
      const r = await decode(vin);
      const v = evaluate(r);
      console.log("─".repeat(60));
      console.log(`VIN ${vin}  (${note})`);
      console.log(`  ${r.ModelYear || "?"} ${r.Make || "?"} ${r.Model || "?"}  [${r.VehicleType || "?"}]`);
      console.log(`  조립국: ${r.PlantCountry || "unknown"} / ${r.PlantCity || ""} ${r.PlantState || ""}`);
      console.log(`  GVWR: ${r.GVWR || "unknown"}`);
      if (v.eligible) {
        console.log(`  판정: ✅ 차량요건 충족 — 신차·최초소유자·개인용·2025+ 대출·소득상한 충족 시 공제 가능`);
      } else {
        console.log(`  판정: ❌ 미충족 — ${v.reasons.join("; ") || "데이터 부족, 수동확인"}`);
      }
    } catch (e) {
      console.log("─".repeat(60));
      console.log(`VIN ${vin}  (${note})`);
      console.log(`  오류: ${e.message}`);
    }
  }
  console.log("─".repeat(60));
})();
