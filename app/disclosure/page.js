export const metadata = {
  title: "Disclosure",
  description: "Advertising, affiliate, and not-tax-advice disclosures.",
};

export default function Disclosure() {
  return (
    <article>
      <nav className="crumbs">
        <a href="/">Home</a> / Disclosure
      </nav>
      <h1>Disclosure</h1>

      <h2>Not tax or legal advice</h2>
      <p>
        This website provides general, informational content about the U.S. car loan interest
        deduction. It is not tax, legal, or financial advice, and using it does not create any
        professional relationship. Eligibility is ultimately determined by the IRS based on your
        specific situation. Always verify with the IRS or a qualified tax professional.
      </p>

      <h2>Affiliate &amp; advertising</h2>
      <p>
        This site is supported by advertising and may contain affiliate links. If you click certain
        links and take an action (such as getting a quote or making a purchase), we may earn a
        commission at no additional cost to you. This never affects the eligibility results shown by
        our tools.
      </p>

      <h2>Data sources</h2>
      <p>
        Vehicle assembly data comes from the U.S. National Highway Traffic Safety Administration
        (NHTSA) vPIC database. Tax details are based on publicly available IRS guidance.
      </p>
    </article>
  );
}
