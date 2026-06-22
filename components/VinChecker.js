"use client";

import { useState } from "react";
import { evaluateDecoded } from "@/lib/eligibility";

export default function VinChecker() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function check(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    const v = vin.trim().toUpperCase();
    if (v.length !== 17) {
      setError("A VIN must be exactly 17 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${v}?format=json`
      );
      const json = await res.json();
      const r = json.Results?.[0] || {};
      setResult({ r, ev: evaluateDecoded(r) });
    } catch (err) {
      setError("Could not reach the VIN database right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vin-tool">
      <form onSubmit={check}>
        <input
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="Enter 17-character VIN"
          maxLength={17}
          aria-label="Vehicle Identification Number"
        />
        <button disabled={loading}>{loading ? "Checking…" : "Check eligibility"}</button>
      </form>

      {error && <p className="err">{error}</p>}

      {result && (
        <div className={`verdict ${result.ev.eligible ? "good" : "bad"}`}>
          <h3>
            {result.ev.eligible
              ? "✅ Vehicle requirement met"
              : "❌ Vehicle requirement not met"}
          </h3>
          <p>
            {[result.r.ModelYear, result.r.Make, result.r.Model].filter(Boolean).join(" ") ||
              "Vehicle"}{" "}
            — assembled in {result.r.PlantCountry || "unknown"}
            {result.r.PlantState ? `, ${result.r.PlantState}` : ""}
          </p>
          {!result.ev.eligible && result.ev.reasons.length > 0 && (
            <ul>
              {result.ev.reasons.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          )}
          {result.ev.eligible && (
            <p className="small">
              You still must meet the loan &amp; income conditions: new vehicle, first owner,
              personal use, loan originated after Dec 31 2024, and MAGI under the limit. This is not
              tax advice.
            </p>
          )}
        </div>
      )}

      <p className="src">
        Live data: U.S. NHTSA vPIC (free, official). Final assembly is VIN-specific — this checks
        your exact vehicle.
      </p>
    </div>
  );
}
