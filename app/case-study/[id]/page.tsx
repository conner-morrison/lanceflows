import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArchDiagram from "@/components/ArchDiagram";
import CaseAvatar from "@/components/CaseAvatar";
import { Wrench, ArrowUpRight, AlertTriangle, Check } from "lucide-react";
import { CASE_DATA, type CaseStudy } from "@/lib/cases-data";

// Locally-stored client portraits keyed by case id (ported from case-detail.html).
const PORTRAITS: Record<string, string> = {
  "medplum-fhir": "/img/client-medplum-fhir.jpg",
  "hyperswitch-payments": "/img/client-formance-ledger.jpg",
  "fleetbase-logistics": "/img/client-fleetbase-logistics.jpg",
  "rentcast-proptech": "/img/client-estated-proptech.jpg",
  "duffel-travel": "/img/client-duffel-travel.jpg",
  "covergenius-insurtech": "/img/client-boost-insurtech.jpg",
  "langchain-clinical": "/img/client-heidihealth-ai.jpg",
  "documenso-legal": "/img/client-harvey-legal.jpg",
  "lago-billing": "/img/client-lago-billing.jpg",
  "qdrant-vectordb": "/img/client-hatchways-proptech.jpg",
  "n8n-automation": "/img/client-sojern-hospitality.jpg",
};

type WorkflowStep = {
  name: string;
  owner: string;
  duration: string;
  notes: string;
  isBottleneck?: boolean;
};

function domain(url: string) {
  return String(url)
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

function initialsOf(name: string) {
  return String(name)
    .replace(/^(Dr\.|Captain|Mr\.|Mrs\.|Ms\.)\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Step({ s, i }: { s: WorkflowStep; i: number }) {
  return (
    <div className="flow-step">
      <span className="fnum">{i + 1}</span>
      <b>
        {s.name}
        {s.isBottleneck && <span className="tag-bottleneck">Bottleneck</span>}
      </b>
      <div className="fmeta">
        {s.owner} · {s.duration}
      </div>
      <p>{s.notes}</p>
    </div>
  );
}

export function generateStaticParams() {
  return CASE_DATA.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const c = CASE_DATA.find((x) => x.id === id);
  return {
    title: c ? `${c.title} — Lanceflows` : "Case study not found — Lanceflows",
    description:
      "Detailed Lanceflows case study — the business problem, our technical role, the solution delivered, verified results, and the value created.",
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idx = CASE_DATA.findIndex((x) => x.id === id);
  const c = CASE_DATA[idx] as CaseStudy | undefined;
  if (!c) notFound();

  const num = String(idx + 1).padStart(2, "0");
  const t = c.testimonial;
  const author =
    t.person + (t.role ? ", " + t.role : "") + (t.company ? " at " + t.company : "");
  const initials = initialsOf(t.person);

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow" id="d-tag">
              Case {num} · {c.category}
            </span>
            <h1 id="d-title">{c.title}</h1>
            <p id="d-summary"></p>
            <div className="d-meta" id="d-meta">
              <span className="d-chip"><Wrench size={14} />{c.ourRole}</span>
              <a className="d-chip" href={c.liveUrl} target="_blank" rel="noopener">
                <ArrowUpRight size={14} />{domain(c.liveUrl)}
              </a>
              {(c.serviceAreas || []).map((a) => (
                <span className="d-chip soft" key={a}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section case-detail">
          <div className="wrap">
            <div id="case-root" className="case-list">
              <article className="case">
                <Link className="back-link in-body" href="/case-study">
                  ← All case studies
                </Link>

                <div className="section-label">Overview</div>
                <p className="case-overview">{c.description}</p>

                <div className="section-label">Challenge &amp; solution</div>
                <div className="case-grid">
                  <div className="cs-card cs-challenge">
                    <div className="col-label">The challenge</div>
                    <p>{c.problem}</p>
                    <ul className="x-list">
                      {c.challenges.map((x, k) => (
                        <li key={k}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cs-card cs-solution">
                    <div className="col-label">Our solution</div>
                    <p>{c.solution}</p>
                    <ul className="check-list">
                      {c.keyImplementations.map((x, k) => (
                        <li key={k}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ArchDiagram id={c.id} title={c.title} />

                <div className="section-label">Technology stack</div>
                <div className="pill-wrap">
                  {c.techStack.map((x) => (
                    <span className="pill" key={x}>
                      {x}
                    </span>
                  ))}
                </div>

                <div className="section-label">Verified results &amp; achievements</div>
                <div className="metrics">
                  {c.resultMetrics.map((m, k) => (
                    <div className="metric" key={k}>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <div className="section-label">Operational business value</div>
                <div className="outcomes">
                  <div className="outcome">
                    <b>Direct value added</b>
                    <span>{c.businessValue}</span>
                  </div>
                  <div className="outcome">
                    <b>Why it matters</b>
                    <span>{c.whyThisMatters}</span>
                  </div>
                </div>

                <div className="section-label">Workflow impact mapping</div>
                <div className="flow-wrap">
                  <div className="flow before">
                    <h2><AlertTriangle size={16} />Before — manual bottleneck flow</h2>
                    {(c.beforeWorkflow as WorkflowStep[]).map((s, k) => (
                      <Step s={s} i={k} key={k} />
                    ))}
                  </div>
                  <div className="flow after">
                    <h2><Check size={16} strokeWidth={3} />After — automated optimized flow</h2>
                    {(c.afterWorkflow as WorkflowStep[]).map((s, k) => (
                      <Step s={s} i={k} key={k} />
                    ))}
                  </div>
                </div>

                <blockquote className="case-quote">
                  <CaseAvatar src={PORTRAITS[c.id]} person={t.person} initials={initials} />
                  <div className="cq-body">
                    “{t.text}”<footer>— {author}</footer>
                  </div>
                </blockquote>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className="cta">
            <h2>Have a problem like this?</h2>
            <p>
              Tell us your goal and we&apos;ll turn it into a structured plan — from idea to stable,
              scalable reality.
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
