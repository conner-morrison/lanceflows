import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Lanceflows",
  description:
    "How Lanceflows collects, uses, and protects information when you contact us or work with our software engineering and AI delivery team.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <span className="eyebrow">Legal</span>
            <h1>Privacy Policy</h1>
            <p>
              We remove uncertainty in how we work — and that includes how we handle your
              information. This policy explains what we collect, why, and the choices you have.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="legal">
              <p className="updated">Last updated: June 5, 2026</p>

              <div className="legal-note">
                Lanceflows (&quot;Lanceflows,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) is a senior software engineering and applied&nbsp;AI delivery team.
                This Privacy Policy describes how we handle information when you visit this website,
                contact us, request a quote, or engage us to deliver a project.
              </div>

              <h2>1. Information We Collect</h2>
              <p>We aim to collect only what we need to respond to you and deliver work reliably.</p>
              <h3>Information you provide</h3>
              <ul>
                <li>
                  <strong>Contact details</strong> — your name, email address, company, and any
                  message you send through our contact form or by email.
                </li>
                <li>
                  <strong>Project information</strong> — details you share about your goals,
                  requirements, scope, timelines, and technical environment so we can plan and
                  deliver the work.
                </li>
                <li>
                  <strong>Communication records</strong> — correspondence, meeting notes, and
                  documented decisions created while we discuss or carry out a project.
                </li>
              </ul>
              <h3>Information collected automatically</h3>
              <ul>
                <li>
                  <strong>Basic usage data</strong> — standard technical information such as browser
                  type, device, approximate region, and pages viewed, used to keep the site secure
                  and understand how it is used.
                </li>
                <li>
                  <strong>Cookies and similar technologies</strong> — limited cookies that help the
                  site function and measure performance. See &quot;Cookies&quot; below.
                </li>
              </ul>

              <h2>2. How We Use Information</h2>
              <p>We use the information above to:</p>
              <ul>
                <li>Respond to your enquiries, requests for a quote, and support questions.</li>
                <li>
                  Plan, scope, and deliver engineering, AI, automation, and cloud work, including
                  architecture, milestones, and documentation.
                </li>
                <li>Communicate clearly about progress, risks, decisions, and delivery.</li>
                <li>Operate, secure, and improve our website and services.</li>
                <li>Meet legal, accounting, and contractual obligations.</li>
              </ul>
              <p>
                We do not sell your personal information, and we do not use it for unrelated
                advertising.
              </p>

              <h2>3. Legal Bases for Processing</h2>
              <p>
                Where applicable law requires it, we process personal information on the basis of
                your consent, the performance of a contract with you, our legitimate interest in
                operating and improving our business, and compliance with legal obligations.
              </p>

              <h2>4. How We Share Information</h2>
              <p>We share information only when necessary, and with appropriate safeguards:</p>
              <ul>
                <li>
                  <strong>Service providers</strong> — trusted vendors who help us operate (for
                  example, hosting, cloud infrastructure, communication, and analytics tools), bound
                  to protect the data they handle.
                </li>
                <li>
                  <strong>Project delivery</strong> — members of our coordinated delivery team who
                  need the information to carry out your project.
                </li>
                <li>
                  <strong>Legal and safety</strong> — where required by law, regulation, or valid
                  legal process, or to protect our rights, users, and systems.
                </li>
                <li>
                  <strong>Business transfers</strong> — in connection with a merger, acquisition, or
                  reorganization, subject to this policy.
                </li>
              </ul>

              <h2>5. Data Security</h2>
              <p>
                Security and disciplined process are central to how we work. We apply reasonable
                technical and organizational measures — including access controls, encryption in
                transit, and documented workflows — to protect information against loss, misuse, and
                unauthorized access. No method of transmission or storage is completely secure, so
                we cannot guarantee absolute security.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We keep personal information only for as long as needed for the purposes described
                here — to respond to you, deliver and support a project, and meet legal, tax, and
                contractual requirements — after which we delete or anonymize it.
              </p>

              <h2>7. Cookies</h2>
              <p>
                We use a small number of cookies and similar technologies to make the site work,
                remember preferences, and measure performance. You can control or disable cookies
                through your browser settings; some features may not function as intended if you do.
              </p>

              <h2>8. Your Rights</h2>
              <p>
                Depending on your location, you may have the right to access, correct, update, or
                delete your personal information, to object to or restrict certain processing, and to
                withdraw consent where processing is based on consent. To exercise any of these
                rights, contact us using the details below and we will respond as required by
                applicable law.
              </p>

              <h2>9. Third-Party Links and Services</h2>
              <p>
                Our website and the systems we build may reference or integrate third-party services
                (for example, cloud providers and integration tools). Their use of your information
                is governed by their own privacy policies, which we encourage you to review.
              </p>

              <h2>10. Children&apos;s Privacy</h2>
              <p>
                Our website and services are intended for businesses and professionals. They are not
                directed to children, and we do not knowingly collect personal information from
                children.
              </p>

              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the
                &quot;Last updated&quot; date above. Material changes will be communicated where
                appropriate.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have questions about this policy or how we handle your information, please{" "}
                <Link href="/#contact">contact us</Link> and our team will be glad to help.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
