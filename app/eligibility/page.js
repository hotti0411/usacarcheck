export const metadata = {
  title: "Car Loan Interest Deduction: Rules, Income Limit & How to Claim (2025–2028)",
  description:
    "Car loan interest deduction rules, AGI/MAGI income limits, qualifying vehicles, and how to claim it (Schedule 1-A). Covers the 2025 One Big Beautiful Bill, tax years 2025–2028.",
};

export default function Eligibility() {
  return (
    <article>
      <nav className="crumbs">
        <a href="/">Home</a> / Rules &amp; Limits
      </nav>
      <h1>Car loan interest deduction: rules, income limits &amp; how to claim</h1>
      <p className="lede">
        The 2025 tax law (One Big Beautiful Bill) created a temporary deduction for interest on a new
        car loan, for tax years 2025 through 2028. Here is who qualifies and how.
      </p>

      <section className="card">
        <h2>How much you can deduct</h2>
        <p>
          Up to <strong>$10,000 of car loan interest per year</strong>. It is an above-the-line
          deduction, so you can claim it whether or not you itemize.
        </p>
      </section>

      <section className="card">
        <h2>Vehicle requirement (the big one)</h2>
        <ul>
          <li>
            <strong>Final assembly in the United States</strong> — this is VIN-specific, not by
            brand. A “foreign” brand assembled in the U.S. can qualify; a “domestic” brand built
            abroad may not.
          </li>
          <li>New vehicle (you must be the first owner). Used and leased vehicles do not qualify.</li>
          <li>Personal use. Gross vehicle weight rating under 14,000 lb.</li>
          <li>Car, minivan, van, SUV, pickup, or motorcycle.</li>
        </ul>
        <p>
          <a href="/#checker">Check your VIN →</a>
        </p>
      </section>

      <section className="card">
        <h2>Income limit (MAGI phase-out)</h2>
        <p>
          The deduction begins to phase out once modified adjusted gross income (MAGI) exceeds{" "}
          <strong>$100,000</strong> for single filers and <strong>$200,000</strong> for joint
          filers, and is reduced as income rises above those thresholds.
        </p>
      </section>

      <section className="card">
        <h2>Loan requirement</h2>
        <ul>
          <li>The loan must have originated after December 31, 2024.</li>
          <li>It must be secured by a first lien on the vehicle.</li>
        </ul>
      </section>

      <section className="card">
        <h2>How to claim it</h2>
        <p>
          The deduction is reported on the new <strong>Schedule 1-A</strong> with your federal
          return. Keep your loan interest statements and confirm your vehicle’s final-assembly point
          (window sticker or VIN).
        </p>
      </section>

      <p>
        <em>
          This page is general information, not tax advice. Rules can change — confirm with the IRS
          or a qualified tax professional.
        </em>
      </p>
    </article>
  );
}
