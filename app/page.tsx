import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import ContactForm from "@/components/ContactForm";
import GearsIcon from "@/components/GearsIcon";

const WHY_CLIENTS: { icon: React.ReactNode; h: string; p: string }[] = [
  { icon: "🤝", h: "Reliability", p: "Commitments are tracked through clear milestones and deliverables." },
  { icon: "🛠️", h: "Professional execution", p: "Senior engineers manage architecture, implementation, testing, and deployment with care." },
  { icon: <GearsIcon />, h: "Controlled process", p: "Track progress, monitor every decision, and refine requirements anytime — clearly and effortlessly, through our seamless system." },
  { icon: "🎯", h: "Predictable results", p: "Clients know what is being built, why it matters, and when it is expected." },
  { icon: "👥", h: "Disciplined workforce", p: "The team operates with ownership, responsiveness, and technical accountability." },
  { icon: "🧘", h: "Zero chaos", p: "A calm, organized delivery experience from discovery to launch." },
];

export default function Home() {
  return (
    <>
      <Header />

      <main id="top">
        <h1 className="sr-only">
          Lanceflows — Software Engineering &amp; AI Services for clients, from idea to launch.
        </h1>

        {/* ===================== HERO SLIDER ===================== */}
        <section className="hero">
          <div className="wrap">
            <HeroSlider />

            <div className="stats">
              <div className="stat">
                <b>50+</b>
                <span>Projects delivered</span>
              </div>
              <div className="stat">
                <b>98%</b>
                <span>Client satisfaction</span>
              </div>
              <div className="stat">
                <b>20+</b>
                <span>Senior engineers</span>
              </div>
              <div className="stat">
                <b>10+</b>
                <span>Industries served</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== DESCRIPTION ===================== */}
        <section className="section" id="about-short">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">What we do</span>
              <h2>A simpler, more confident way to build</h2>
              <p>
                Lanceflows is a senior software engineering and AI team that turns your idea into a
                reliable, working product. We remove the friction of planning, building, and
                shipping — so your project moves with confidence and flow.
              </p>
            </div>
            <div className="feature-grid">
              <div className="card">
                <div className="ic">🎯</div>
                <h3>Right-fit expertise</h3>
                <p>
                  We put senior specialists on your project whose strengths fit the work —
                  architecture, AI, cloud, and data.
                </p>
              </div>
              <div className="card">
                <div className="ic">🤝</div>
                <h3>Seamless collaboration</h3>
                <p>
                  Clear scopes, transparent communication, and a workflow that keeps everyone
                  aligned end to end.
                </p>
              </div>
              <div className="card">
                <div className="ic">🚀</div>
                <h3>Built to grow</h3>
                <p>
                  From a single feature to a full platform, we scale with your ambitions and your
                  timeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT US ===================== */}
        <section className="section" id="about">
          <div className="wrap">
            <div className="about-grid">
              <div className="about-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/com_slogan.png"
                  alt="Lanceflows — where strong action meets seamless flow"
                />
              </div>
              <div className="about-text">
                <span className="eyebrow">About us · Who we are</span>
                <h2>One coordinated delivery system</h2>
                <p>
                  We are a full-service software engineering and AI delivery team made up of{" "}
                  <strong>senior engineers with 12+ years of experience</strong> across product
                  engineering, cloud architecture, automation, data systems, and applied artificial
                  intelligence. Our strength comes from combining each specialist&apos;s expertise
                  into one coordinated delivery system.
                </p>
                <p>
                  We don&apos;t simply implement a client&apos;s initial idea. We help discover the
                  full architecture, identify potential risks, design for stable scalability,
                  prepare a future-ready technical roadmap, and execute through clear milestones —
                  for controlled, predictable delivery without chaos.
                </p>
                <ul className="about-points">
                  <li>Senior-led, architecture-first delivery from idea to stable, scalable reality.</li>
                  <li>Transparent milestones, documented decisions, and predictable results.</li>
                  <li>Future-ready engineering built for scale, security, and growth.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== WHY LANCEFLOWS ===================== */}
        <section className="section alt" id="why">
          <div className="wrap">
            <div className="section-head center">
              <span className="eyebrow">Why Lanceflows</span>
              <h2>Why teams choose Lanceflows</h2>
              <p>
                Clients feel safe because our process removes uncertainty. We communicate clearly,
                expose risks early, document decisions, and keep delivery aligned with business
                priorities — work that&apos;s visible, structured, and measurable.
              </p>
            </div>
            <div className="why-grid why-grid--static">
              {WHY_CLIENTS.map((c) => (
                <div className="why-card" key={c.h}>
                  <div className="num" aria-hidden="true">{c.icon}</div>
                  <div>
                    <h3>{c.h}</h3>
                    <p>{c.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CTA ===================== */}
        <section>
          <div className="cta">
            <h2>Ready to flow with us?</h2>
            <p>
              Tell us what you want to build. From idea to launch, Lanceflows makes the next step
              seamless.
            </p>
            <Link className="btn btn-ghost" href="#contact">
              Contact us
            </Link>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section className="section alt" id="contact">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Contact us</span>
              <h2>Let&apos;s start the conversation</h2>
              <p>
                Tell us about your project or your strengths — we&apos;ll get back to you shortly.
              </p>
            </div>
            <div className="contact-grid">
              <ContactForm />
              <div className="contact-side">
                <ul className="contact-info">
                  <li>
                    <span className="ic">✉️</span>
                    <div>
                      <strong>Email</strong>
                      <small>admin@lanceflows.com</small>
                    </div>
                  </li>
                  <li>
                    <span className="ic">📍</span>
                    <div>
                      <strong>Office</strong>
                      <small>Austin, Texas</small>
                    </div>
                  </li>
                  <li>
                    <span className="ic">⏰</span>
                    <div>
                      <strong>Hours</strong>
                      <small>Mon–Fri, 9:00–18:00</small>
                    </div>
                  </li>
                </ul>
                <div className="book-call">
                  <strong>Prefer to talk live?</strong>
                  <p>Pick a time that works for you and book a free intro call.</p>
                  <a
                    className="btn btn-primary"
                    href="https://cal.com/lanceflows"
                    target="_blank"
                    rel="noopener"
                  >
                    Book an appointment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
