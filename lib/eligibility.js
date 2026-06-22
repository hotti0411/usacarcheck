// Shared eligibility logic for the OBBBA (2025–2028) car loan interest deduction — vehicle side.
// Buyer-side conditions (new car, personal use, loan date, income) are explained, not computed.

export const QUALIFYING_TYPES = [
  "PASSENGER CAR",
  "MULTIPURPOSE", // MPV = SUV / minivan / van
  "MPV",
  "TRUCK", // pickup (subject to GVWR)
  "MOTORCYCLE",
  "VAN",
];
export const NON_QUALIFYING_TYPES = ["BUS", "TRAILER", "LOW SPEED", "OFF ROAD", "INCOMPLETE"];

export function gvwrClass(gvwr) {
  const m = /Class\s+(\d+)/i.exec(gvwr || "");
  return m ? parseInt(m[1], 10) : null; // Class 1–3 = <= 14,000 lb (qualifies)
}

export function typeQualifies(vt) {
  const t = (vt || "").toUpperCase();
  if (!t) return null;
  if (NON_QUALIFYING_TYPES.some((k) => t.includes(k))) return false;
  return QUALIFYING_TYPES.some((k) => t.includes(k));
}

// Evaluate a live NHTSA vPIC DecodeVinValues result object.
export function evaluateDecoded(r) {
  const reasons = [];
  const plant = (r.PlantCountry || "").toUpperCase();
  const usAssembled = plant.includes("UNITED STATES");
  if (!usAssembled) reasons.push(`Final assembly is not in the U.S. (${r.PlantCountry || "unknown"})`);

  const tq = typeQualifies(r.VehicleType);
  if (tq === false) reasons.push(`Vehicle type may not qualify (${r.VehicleType})`);

  const cls = gvwrClass(r.GVWR);
  const weightOk = cls === null ? null : cls <= 3;
  if (weightOk === false) reasons.push(`GVWR over 14,000 lb (${r.GVWR})`);

  const eligible = usAssembled && tq !== false && weightOk !== false;
  return { eligible, reasons, usAssembled };
}

// Verdict for static model pages, from a coarse assembly tag: "us" | "foreign" | "mixed".
export function modelVerdict(assembly) {
  switch (assembly) {
    case "us":
      return {
        status: "likely",
        title: "Likely eligible",
        tone: "good",
        blurb:
          "This model is typically assembled in the United States, which satisfies the final-assembly requirement. Confirm your exact unit with the VIN checker below.",
      };
    case "foreign":
      return {
        status: "no",
        title: "Likely NOT eligible",
        tone: "bad",
        blurb:
          "This model is typically assembled outside the United States, so it usually does not meet the final-assembly requirement. Check your specific VIN below to be sure.",
      };
    default:
      return {
        status: "depends",
        title: "Depends on your specific VIN",
        tone: "warn",
        blurb:
          "This model is built in more than one plant, so eligibility varies unit by unit. Enter your VIN below to check your exact vehicle.",
      };
  }
}
