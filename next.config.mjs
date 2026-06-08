/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deployed on Vercel, which runs Next.js natively — no `output: "export"`
  // needed. All pages are still prerendered (SSG). If you ever deploy to a
  // non-Vercel static host (GitHub Pages, S3, nginx), re-add `output: "export"`.
  images: { unoptimized: true },
  trailingSlash: true,
  // Hide the Next.js dev-tools indicator ("N" badge at bottom-left).
  devIndicators: false,
};

export default nextConfig;
