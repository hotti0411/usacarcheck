import "./globals.css";
import Script from "next/script";

const ADSENSE_CLIENT = "ca-pub-6907064705978016";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://usacarcheck.com"),
  title: {
    default: "Car Loan Interest Deduction Checker (2025–2028)",
    template: "%s",
  },
  description:
    "Free tool: check if your vehicle qualifies for the new U.S. car loan interest tax deduction. Enter your VIN for an instant answer using official NHTSA data.",
  // AdSense site-ownership verification (meta-tag method).
  other: { "google-adsense-account": ADSENSE_CLIENT },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          id="adsbygoogle-init"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <header className="site-header">
          <a href="/" className="logo">USACarCheck</a>
          <nav>
            <a href="/eligibility/">Rules &amp; Limits</a>
            <a href="/#checker">VIN Checker</a>
          </nav>
        </header>
        <div className="container">{children}</div>
        <footer className="site-footer">
          <p>
            <strong>This is not tax or legal advice.</strong> This is an informational tool.
            Eligibility is determined by the IRS; final assembly is VIN-specific. Verify with the
            IRS or a qualified tax professional before claiming any deduction.
          </p>
          <p>
            <a href="/privacy/">Privacy</a> · <a href="/disclosure/">Disclosure</a> · Vehicle data:
            U.S. NHTSA vPIC
          </p>
        </footer>
      </body>
    </html>
  );
}
