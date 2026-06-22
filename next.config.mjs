/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → pure HTML/CSS/JS in ./out, hostable free on Cloudflare Pages / Vercel.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
