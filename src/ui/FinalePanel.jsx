import { useEffect, useRef } from "react";

export default function FinalePanel({ onOpenContact, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
      role="dialog"
      aria-modal="true"
      aria-label="All fragments found"
    >
      <div
        className="w-full text-center"
        style={{
          maxWidth: 520,
          background: "#12172a",
          border: "4px solid #ffb84d",
          boxShadow: "10px 10px 0 rgba(0,0,0,0.5)",
          padding: "40px 36px",
        }}
      >
        <div className="pixel-font" style={{ fontSize: 14, color: "#ffb84d", lineHeight: 1.8, marginBottom: 16 }}>
          THE BEACON IS LIT
        </div>
        <p className="mono-font" style={{ color: "#cfd6cc", fontSize: 14, lineHeight: 1.7, marginTop: 0 }}>
          Six fragments, twelve years, one throughline. That's the story — if it's the kind of engineer you're
          looking for, send a signal or grab the resume.
        </p>
        <div className="flex flex-wrap justify-center gap-3" style={{ marginTop: 24 }}>
          <button
            onClick={onOpenContact}
            className="pixel-font"
            style={{ fontSize: 11, color: "#0b0e1a", background: "#39ff88", border: "none", padding: "12px 18px", cursor: "pointer" }}
          >
            SEND A SIGNAL
          </button>
          <a
            href="/Giancarlo_Poemape_CV.pdf"
            download
            className="pixel-font"
            style={{
              fontSize: 11,
              color: "#ffb84d",
              border: "2px solid #ffb84d",
              padding: "12px 18px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            DOWNLOAD CV
          </a>
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          className="pixel-font mono-font"
          style={{ marginTop: 24, fontSize: 10, color: "#9aa39a", background: "none", border: "none", cursor: "pointer" }}
        >
          keep exploring &#8594;
        </button>
      </div>
    </div>
  );
}
