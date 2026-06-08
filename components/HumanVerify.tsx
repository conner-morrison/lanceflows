"use client";

import { useEffect, useRef, useState } from "react";

// Real bot protection: a Cloudflare Turnstile challenge gating the site once per
// browser session. Turnstile runs Cloudflare's actual bot detection (browser
// integrity, behavioral signals, proof-of-work, and an interactive challenge when
// needed) — unlike the old click-a-box overlay, which was pure UI.
//
// NOTE: this is a fully static site (no server), so the token is not verified
// server-side via Cloudflare's /siteverify. That means the *challenge* is real,
// but enforcement (revealing the page) is client-side. For hard enforcement,
// verify the token in a Cloudflare Worker / serverless function. We also fail
// OPEN (reveal the site) if the Turnstile script is blocked, so real visitors are
// never locked out.

const KEY = "lf_human_verified";
// Cloudflare's "always passes" TEST key — replace via NEXT_PUBLIC_TURNSTILE_SITE_KEY
// with your real site key for production. Test keys: docs.cloudflare.com/turnstile
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

type TurnstileOpts = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileOpts) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

export default function HumanVerify() {
  const [show, setShow] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [error, setError] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  // Decide whether to show the gate (only when not already verified this session).
  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      /* sessionStorage unavailable — show the gate anyway */
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";

    const pass = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      setHiding(true);
      window.setTimeout(() => {
        setShow(false);
        document.documentElement.style.overflow = "";
      }, 500);
    };

    const renderWidget = () => {
      if (renderedRef.current || !window.turnstile || !hostRef.current) return;
      renderedRef.current = true;
      try {
        window.turnstile.render(hostRef.current, {
          sitekey: SITE_KEY,
          theme: "auto",
          callback: () => pass(),
          "error-callback": () => setError(true),
          "expired-callback": () => window.turnstile?.reset(),
        });
      } catch {
        setError(true);
      }
    };

    // Load the Turnstile script once, then render the widget.
    if (window.turnstile) {
      renderWidget();
    } else {
      let script = document.querySelector<HTMLScriptElement>("script[data-turnstile]");
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.dataset.turnstile = "1";
        document.head.appendChild(script);
      }
      script.addEventListener("load", renderWidget);
    }

    // Fail-open: if the script is blocked / never renders, don't lock real users out.
    const failOpen = window.setTimeout(() => {
      if (!renderedRef.current) pass();
    }, 8000);

    return () => {
      window.clearTimeout(failOpen);
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={"vh-overlay" + (hiding ? " vh-hide" : "")}
      role="dialog"
      aria-modal="true"
      aria-label="Human verification"
    >
      <div className="vh-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="vh-logo" src="/company_logo.png" alt="Lanceflows" />
        <h2>Quick check</h2>
        <p>Confirm you&rsquo;re human to continue to Lanceflows.</p>
        <div ref={hostRef} className="vh-turnstile" />
        {error && (
          <p className="vh-error">
            Couldn&rsquo;t load the security check. Please disable blockers and refresh.
          </p>
        )}
        <div className="vh-foot">Protected by Cloudflare Turnstile</div>
      </div>
    </div>
  );
}
