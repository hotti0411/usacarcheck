import { notFound } from "next/navigation";
import { getAllParams, getVehicle, getByMake } from "@/lib/vehicles";
import { modelVerdict } from "@/lib/eligibility";
import VinChecker from "@/components/VinChecker";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return getAllParams();
}

export function generateMetadata({ params }) {
  const v = getVehicle(params.year, params.make, params.model);
  if (!v) return {};
  return {
    title: `Does the ${v.year} ${v.make} ${v.model} qualify for the car loan interest deduction?`,
    description: `Is the ${v.year} ${v.make} ${v.model} eligible for the U.S. car loan interest tax deduction? Assembly location, eligibility, and a free VIN checker.`,
  };
}

export default function ModelPage({ params }) {
  const v = getVehicle(params.year, params.make, params.model);
  if (!v) notFound();
  const verdict = modelVerdict(v.assembly);
  const related = getByMake(v.makeSlug)
    .filter((x) => !(x.year === v.year && x.modelSlug === v.modelSlug))
    .slice(0, 8);

  return (
    <article>
      <nav className="crumbs">
        <a href="/">Home</a> / <a href={`/make/${v.makeSlug}/`}>{v.make}</a> / {v.year} {v.model}
      </nav>

      <h1>
        Does the {v.year} {v.make} {v.model} qualify for the car loan interest deduction?
      </h1>

      <div className={`verdict ${verdict.tone}`}>
        <h2>{verdict.title}</h2>
        <p>{verdict.blurb}</p>
      </div>

      <section className="card">
        <h2>Assembly</h2>
        <p>
          <strong>Body type:</strong> {v.bodyClass || "—"}
        </p>
        <p>
          <strong>Typical assembly:</strong> {(v.plants && v.plants.join("; ")) || "Varies"}
        </p>
        {v.note && <p>{v.note}</p>}
      </section>

      <AdSlot />

      <section id="checker" className="card">
        <h2>
          Check your exact {v.make} {v.model}
        </h2>
        <p>Assembly is VIN-specific. Enter your 17-character VIN for a definitive answer:</p>
        <VinChecker />
      </section>

      <section className="card info">
        <h2>Eligibility recap</h2>
        <ul>
          <li>Final assembly in the U.S. (checked above)</li>
          <li>New vehicle, first owner, personal use</li>
          <li>Loan originated after Dec 31, 2024</li>
          <li>Up to $10,000 interest/year, 2025–2028</li>
          <li>MAGI under $100k ($200k joint)</li>
        </ul>
        <p>
          <a href="/eligibility/">Full rules &amp; income limits →</a>
        </p>
      </section>

      {related.length > 0 && (
        <section className="card">
          <h2>Other {v.make} models</h2>
          <ul className="model-grid">
            {related.map((r) => (
              <li key={`${r.year}-${r.modelSlug}`}>
                <a href={`/${r.year}/${r.makeSlug}/${r.modelSlug}/`}>
                  {r.year} {r.make} {r.model}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
