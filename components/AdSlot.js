// Placeholder ad slot. After AdSense approval, paste your <ins class="adsbygoogle"> unit here
// and load the AdSense script in app/layout.js. Kept visually separated from interactive
// elements — never place an ad next to the "Check" button (avoids accidental-click violations).
export default function AdSlot({ label = "Advertisement" }) {
  return (
    <div className="ad-slot" aria-hidden="true">
      <span>{label}</span>
      <small>Ad slot — your AdSense unit goes here after approval</small>
    </div>
  );
}
