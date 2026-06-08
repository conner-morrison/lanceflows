import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.png"
              alt="Lanceflows"
              width={549}
              height={383}
              style={{
                width: "160px",
                height: "111.6px",
                display: "block",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            />
            <strong style={{ color: "#fff", fontSize: "1.2rem" }}>Lanceflows</strong>
            <p>
              A senior software engineering and AI team that turns your ideas into reliable,
              scalable products — with clear architecture, disciplined delivery, and zero chaos.
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h2>Company</h2>
              <Link href="/services">Services</Link>
              <Link href="/case-study">Case Studies</Link>
              <Link href="/#about">About us</Link>
              <Link href="/#why">Why Lanceflows</Link>
              <Link href="/#contact">Contact</Link>
            </div>
            <div className="foot-col">
              <h2>Get started</h2>
              <Link href="/#contact">Request a quote</Link>
              <a href="https://cal.com/lanceflows" target="_blank" rel="noopener">
                Book a call
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Lanceflows. All rights reserved.</span>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Services</Link>
        </div>
      </div>
    </footer>
  );
}
