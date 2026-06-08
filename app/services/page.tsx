import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services — Lanceflows | Software Engineering & AI",
  description:
    "Lanceflows software engineering and applied AI services — product engineering, AI & automation, cloud, data integration, architecture consulting, and ongoing growth.",
};

const SERVICES = [
  { ic: "💻", h: "Product Engineering", p: "Custom SaaS platforms, enterprise applications, portals, dashboards, and business systems." },
  { ic: "🤖", h: "AI & Automation", p: "AI voice agents, RAG assistants, document intelligence, workflow agents, and computer vision." },
  { ic: "☁️", h: "Cloud & DevOps", p: "Cloud architecture, CI/CD, monitoring, scalability, reliability, and cost-aware operations." },
  { ic: "🔗", h: "Data & Integration", p: "API integrations, data extraction, web scraping, analytics pipelines, and CRM/ERP integration." },
  { ic: "📐", h: "Architecture & Consulting", p: "Discovery, system design, risk analysis, roadmap planning, and engineering leadership." },
  { ic: "🌱", h: "Maintenance & Growth", p: "Ongoing support, optimization, feature expansion, security improvements, and product evolution." },
];

const INDUSTRIES = [
  { img: "fintech", b: "Fintech & Payments", s: "Digital banking, transaction workflows, reconciliation, fraud monitoring, KYC/AML, portfolio dashboards." },
  { img: "healthcare", b: "Healthcare & Medical", s: "HIPAA-conscious apps, telemedicine, patient portals, EHR/EMR integrations, clinical AI assistants." },
  { img: "realestate", b: "Real Estate / PropTech", s: "Property management platforms, MLS/listing integrations, valuation tools, underwriting automation." },
  { img: "travel", b: "Travel & Hospitality", s: "Booking systems, guest portals, ordering platforms, ticketing, revenue and occupancy analytics." },
  { img: "logistics", b: "Logistics & Supply Chain", s: "Shipment tracking, route optimization, warehouse systems, freight automation, inventory analytics." },
  { img: "insurance", b: "Insurance / InsurTech", s: "Claims workflows, underwriting automation, policy administration, risk modeling, self-service portals." },
  { img: "energy", b: "Energy & CleanTech", s: "Smart grid platforms, renewable asset monitoring, IoT telemetry, energy analytics, and carbon/ESG reporting." },
  { img: "ai", b: "Vertical AI Applications", s: "Voice agents, RAG assistants, workflow agents, document intelligence, computer vision." },
];

const TECH = [
  { h: "AI & Data", pills: ["OpenAI", "LangChain", "RAG", "Agentic AI", "NLP", "Computer Vision", "Data Mining", "Web Scraping"] },
  { h: "Automation & Integration", pills: ["n8n", "Zapier", "Make.com", "API Integration", "Selenium", "Beautiful Soup"] },
  { h: "Frontend", pills: ["React", "Next.js", "MUI", "Tailwind CSS", "Styled Components"] },
  { h: "Backend", pills: ["Node.js", "Express", "Python", "Django", "Flask", "FastAPI"] },
  { h: "Databases & Tooling", pills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "NPM", "GitHub Actions", "Docker"] },
  { h: "Cloud & Infrastructure", pills: ["AWS", "Azure", "Cloudflare", "CI/CD", "Monitoring", "Scalable Deployment"] },
];

const DIFFERENT = [
  { b: "Senior-led delivery", s: "Projects guided by experienced engineers who understand architecture, risk, scale, and production realities." },
  { b: "Architecture before execution", s: "We clarify the goal, blueprint, risk points, data flow, integrations, and milestones before building." },
  { b: "Seamless workflow", s: "Clients experience one coordinated system rather than disconnected developers working in isolation." },
  { b: "Business-focused engineering", s: "Every technical decision is tied to reliability, maintainability, cost, speed, and long-term growth." },
  { b: "Controlled process, zero chaos", s: "Clear communication, documented progress, predictable delivery, and disciplined quality control." },
  { b: "Future-ready thinking", s: "We build for scaling, security, extensibility, and future product direction — not just today's features." },
];

const PAINS = [
  { num: "?", h: "Unclear project direction", p: "We convert vague ideas into a structured blueprint, roadmap, milestones, and execution plan." },
  { num: "!", h: "Poor technical decisions early on", p: "We identify architecture risks before they become expensive rebuilds." },
  { num: "⚑", h: "Unreliable freelancers or scattered teams", p: "We provide a coordinated senior team with ownership, communication, and accountability." },
  { num: "⏱", h: "Slow manual operations", p: "We automate repetitive workflows and connect tools, APIs, CRMs, databases, and internal systems." },
  { num: "AI", h: "Difficulty adopting AI", p: "We design practical AI systems that fit real business workflows rather than experimental demos." },
  { num: "↗", h: "Scaling and maintenance problems", p: "We build clean, maintainable systems designed for future features, traffic, and team growth." },
];

const RECEIVE = [
  { b: "A production-ready product", s: "Software, AI system, automation workflow, or platform aligned with the business goal." },
  { b: "Clear architecture & docs", s: "Technical documentation explaining how the system works and how it can grow." },
  { b: "Clean, maintainable codebase", s: "Organized repositories, version control, and a structured deployment setup." },
  { b: "Integrated systems", s: "APIs, databases, cloud infrastructure, and user-facing interfaces per the project scope." },
  { b: "Testing & handover", s: "Deployment support, performance checks, and clear handover guidance." },
  { b: "A future roadmap", s: "A realistic plan for improvements, scalability, maintenance, and next-phase development." },
];

const MODELS = [
  { ic: "👥", h: "Dedicated team", p: "A dedicated development team for long-term product delivery." },
  { ic: "🎯", h: "Fixed-scope project", p: "Fixed-scope delivery for clearly defined outcomes." },
  { ic: "➕", h: "Staff augmentation", p: "Extra engineering capacity and specialist support for your team." },
  { ic: "📐", h: "Technical consulting", p: "Architecture review and engineering leadership." },
  { ic: "🛠️", h: "Ongoing support", p: "Maintenance, optimization, and continuous product support." },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow">Software Engineering &amp; AI Services</span>
            <h1>From idea to stable, scalable reality.</h1>
            <p>
              A senior software engineering and applied AI team that turns client ideas into
              reliable products — through clear architecture, disciplined execution, transparent
              milestones, and long-term scalability planning.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">What we provide</span>
              <h2>Full-service delivery, one coordinated system</h2>
              <p>
                Six core capability areas that cover the full lifecycle — from discovery and design
                to delivery, maintenance, and growth.
              </p>
            </div>
            <div className="service-grid">
              {SERVICES.map((s) => (
                <div className="service-card" key={s.h}>
                  <div className="ic">{s.ic}</div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Industries &amp; use cases</span>
              <h2>Where we deliver</h2>
              <p>We support both industry-specific platforms and cross-industry automation systems.</p>
            </div>
            <div className="industry-grid">
              {INDUSTRIES.map((it) => (
                <div className="industry" key={it.img}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="industry-img" src={`/img/industry-${it.img}.jpg`} alt={it.b} />
                  <div className="industry-body">
                    <b>{it.b}</b>
                    <span>{it.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Technology stack</span>
              <h2>Modern, production-grade tools</h2>
              <p>A proven toolset spanning AI, automation, frontend, backend, data, and cloud.</p>
            </div>
            <div className="tech-stack">
              {TECH.map((row) => (
                <div className="tech-row" key={row.h}>
                  <h2>{row.h}</h2>
                  <div className="pill-wrap">
                    {row.pills.map((p) => (
                      <span className="pill" key={p}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">What makes us different</span>
              <h2>Senior-led, architecture-first, zero chaos</h2>
              <p>Every project is guided by experienced engineers and a calm, seamless workflow.</p>
            </div>
            <div className="diff-grid">
              {DIFFERENT.map((d) => (
                <div className="diff" key={d.b}>
                  <span className="check">✓</span>
                  <div>
                    <b>{d.b}</b>
                    <span>{d.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Pain points we solve</span>
              <h2>From uncertainty to controlled delivery</h2>
              <p>The common problems clients bring us — and how our process resolves them.</p>
            </div>
            <div className="why-grid why-grid--static">
              {PAINS.map((p) => (
                <div className="why-card" key={p.h}>
                  <div className="num">{p.num}</div>
                  <div>
                    <h3>{p.h}</h3>
                    <p>{p.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">What you receive</span>
              <h2>Delivered at the end of every engagement</h2>
              <p>Concrete, production-ready outcomes — not just code.</p>
            </div>
            <div className="diff-grid">
              {RECEIVE.map((d) => (
                <div className="diff" key={d.b}>
                  <span className="check">✓</span>
                  <div>
                    <b>{d.b}</b>
                    <span>{d.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Engagement models</span>
              <h2>Ways to work with us</h2>
              <p>Flexible models to match your scope, capacity, and stage of growth.</p>
            </div>
            <div className="service-grid">
              {MODELS.map((m) => (
                <div className="service-card" key={m.h}>
                  <div className="ic">{m.ic}</div>
                  <h3>{m.h}</h3>
                  <p>{m.p}</p>
                </div>
              ))}
              <div className="service-card">
                <div className="ic">🤝</div>
                <h3>Not sure yet?</h3>
                <p>
                  Tell us your goal and we&apos;ll recommend the right model.{" "}
                  <Link href="/#contact" style={{ color: "var(--brand)", fontWeight: 700 }}>
                    Talk to us →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="cta">
            <h2>Move from idea to reality — without the chaos.</h2>
            <p>
              Senior engineering judgment, practical AI expertise, disciplined execution, and a
              seamless delivery system that protects your project from confusion and risk.
            </p>
            <Link className="btn btn-ghost" href="/#contact">
              Contact us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
