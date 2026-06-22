import { notFound } from "next/navigation";
import { getMakeParams, getByMake, makeName } from "@/lib/vehicles";
import { modelVerdict } from "@/lib/eligibility";

export function generateStaticParams() {
  return getMakeParams();
}

export function generateMetadata({ params }) {
  const name = makeName(params.make);
  return {
    title: `Which ${name} vehicles qualify for the car loan interest deduction?`,
    description: `See which ${name} models are eligible for the U.S. car loan interest tax deduction (2025–2028), based on U.S. final assembly. Free VIN checker included.`,
  };
}

function Section({ title, items }) {
  if (items.length === 0) return null;
  return (
    <section className="card">
      <h2>
        {title} ({items.length})
      </h2>
      <ul className="model-grid">
        {items.map((v) => (
          <li key={`${v.year}-${v.modelSlug}`}>
            <a href={`/${v.year}/${v.makeSlug}/${v.modelSlug}/`}>
              {v.year} {v.make} {v.model}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function MakePage({ params }) {
  const list = getByMake(params.make);
  if (!list.length) notFound();
  const name = makeName(params.make);

  const groups = { likely: [], depends: [], no: [] };
  for (const v of list) {
    const status = modelVerdict(v.assembly).status; // "likely" | "depends" | "no"
    (groups[status] || groups.depends).push(v);
  }

  return (
    <article>
      <nav className="crumbs">
        <a href="/">Home</a> / <a href="/models/">Models</a> / {name}
      </nav>
      <h1>Which {name} vehicles qualify for the car loan interest deduction?</h1>
      <p className="lede">
        Eligibility depends on U.S. final assembly, which is VIN-specific. Pick your {name} model
        to see details and check your exact VIN.
      </p>
      <Section title="Likely eligible (U.S.-assembled)" items={groups.likely} />
      <Section title="Depends on your VIN" items={groups.depends} />
      <Section title="Likely not eligible (imported)" items={groups.no} />
      <p>
        <a href="/eligibility/">Full rules &amp; income limits →</a>
      </p>
    </article>
  );
}
