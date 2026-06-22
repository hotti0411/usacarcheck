import VinChecker from "@/components/VinChecker";
import AdSlot from "@/components/AdSlot";
import { vehicles, getMakes } from "@/lib/vehicles";

export const metadata = {
  title: "Car Loan Interest Deduction Checker — Does Your Car Qualify? (2025–2028)",
  description:
    "Enter your VIN to instantly check if your vehicle qualifies for the new U.S. car loan interest tax deduction (One Big Beautiful Bill, 2025–2028). Free, official NHTSA data.",
};

export default function Home() {
  const makes = getMakes();
  const featured = vehicles.filter((v) => v.assembly === "us").slice(0, 9);
  return (
    <>
      <section className="hero">
        <h1>Does your car qualify for the car loan interest deduction?</h1>
        <p className="lede">
          Under the 2025 tax law (the One Big Beautiful Bill), you can deduct up to{" "}
          <strong>$10,000/year</strong> of interest on a new car loan — but only if your vehicle had
          its <strong>final assembly in the United States</strong>. Check your exact vehicle in
          seconds.
        </p>
      </section>

      <section id="checker" className="card">
        <h2>VIN eligibility checker</h2>
        <VinChecker />
      </section>

      <AdSlot />

      <section>
        <h2>Browse by make</h2>
        <p className="muted">
          Checking {vehicles.length} vehicles across {makes.length} makes.
        </p>
        <ul className="model-grid">
          {makes.map((m) => (
            <li key={m.makeSlug}>
              <a href={`/make/${m.makeSlug}/`}>
                {m.make} ({m.count})
              </a>
            </li>
          ))}
        </ul>
        <p>
          <a href="/models/">Browse all models →</a>
        </p>
      </section>

      <section>
        <h2>Popular eligible models</h2>
        <ul className="model-grid">
          {featured.map((v) => (
            <li key={`${v.year}-${v.makeSlug}-${v.modelSlug}`}>
              <a href={`/${v.year}/${v.makeSlug}/${v.modelSlug}/`}>
                {v.year} {v.make} {v.model}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <AdSlot />

      <section className="card info">
        <h2>How the deduction works</h2>
        <ul>
          <li>
            Deduct up to <strong>$10,000</strong> of car loan interest per year, 2025–2028.
          </li>
          <li>
            Vehicle must have <strong>final assembly in the U.S.</strong> (VIN-specific).
          </li>
          <li>New vehicle, first owner, personal use, loan originated after Dec 31, 2024.</li>
          <li>
            Phases out above <strong>$100k MAGI</strong> ($200k for joint filers).
          </li>
        </ul>
        <p>
          <a href="/eligibility/">Full rules &amp; income limits →</a>
        </p>
      </section>
    </>
  );
}
