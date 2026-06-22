export const metadata = {
  title: "Privacy Policy",
  description: "How this site handles data, cookies, and advertising.",
};

export default function Privacy() {
  return (
    <article>
      <nav className="crumbs">
        <a href="/">Home</a> / Privacy
      </nav>
      <h1>Privacy Policy</h1>
      <p>
        We respect your privacy. This site is an informational tool and does not require an account.
      </p>
      <h2>VIN lookups</h2>
      <p>
        When you use the VIN checker, your browser sends the VIN directly to the U.S. NHTSA vPIC
        public API to decode it. We do not store the VINs you enter on our servers.
      </p>
      <h2>Cookies &amp; advertising</h2>
      <p>
        We may use cookies and third-party advertising partners (such as Google AdSense). These
        partners may use cookies to serve ads based on your visits to this and other sites. You can
        manage ad personalization through your browser settings and Google’s Ads Settings.
      </p>
      <h2>Analytics</h2>
      <p>We may use privacy-respecting analytics to understand aggregate traffic.</p>
      <p>
        <em>This policy may be updated. Last reviewed at launch.</em>
      </p>
    </article>
  );
}
