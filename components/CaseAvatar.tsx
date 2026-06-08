"use client";

import { useState } from "react";

// Portrait photo with an automatic initials-badge fallback if it can't load
// (ported from case-detail.html's onerror avatar swap).
export default function CaseAvatar({
  src,
  person,
  initials,
}: {
  src?: string;
  person: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <span className="cq-avatar cq-fallback">{initials}</span>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="cq-avatar"
      src={src}
      alt={`Portrait of ${person}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
