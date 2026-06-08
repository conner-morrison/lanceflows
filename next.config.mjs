/** @type {import('next').NextConfig} */
const nextConfig = {
  // The original was a fully static site — export to plain HTML/CSS/JS.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Hide the Next.js dev-tools indicator ("N" badge at bottom-left).
  devIndicators: false,
};

export default nextConfig;
