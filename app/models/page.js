import { getMakes, vehicles } from "@/lib/vehicles";

export const metadata = {
  title: "Car loan interest deduction: eligible vehicles by make (2025–2028)",
  description:
    "Browse every make and model to check car loan interest deduction eligibility (U.S. final assembly). Free VIN checker for your exact vehicle.",
};

export default function Models() {
  const makes = getMakes();
  return (
    <article>
      <nav className="crumbs">
        <a href="/">Home</a> / Models
      </nav>
      <h1>Car loan interest deduction: eligible vehicles by make</h1>
      <p className="lede">
        We track {vehicles.length} vehicles across {makes.length} makes. Pick a make, then check
        your exact VIN.
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
    </article>
  );
}
