import { useEffect, useState } from "react";
import { experience } from "../../content/experience";
import { useLanguage, pickLang } from "../../i18n/LanguageContext";

export default function ExperiencePanel() {
  const { dict, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const job = experience[index];
  const { title, points } = pickLang(job, lang);
  const atStart = index === 0;
  const atEnd = index === experience.length - 1;

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(experience.length - 1, i + 1));

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "ArrowLeft") goPrev();
      if (e.code === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <div className="pixel-font" style={{ fontSize: 10, color: "#9aa39a", marginBottom: 12 }}>
        {dict.experience.counter(index + 1, experience.length)}
      </div>

      <div className="pixel-font" style={{ fontSize: 15, color: "#39ff88", marginBottom: 8, lineHeight: 1.6 }}>
        {title}
      </div>

      <div className="mono-font" style={{ fontSize: 12, color: "#ffb84d", margin: "0 0 16px" }}>
        {job.company} · {job.date}
      </div>

      <ul className="mono-font" style={{ margin: "0 0 24px", paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: "#cfd6cc" }}>
        {points.map((p) => (
          <li key={p} style={{ marginBottom: 6 }}>
            {p}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid #232a3d", paddingTop: 16 }}>
        <button
          type="button"
          className="pixel-font"
          disabled={atStart}
          onClick={goPrev}
          style={{
            fontSize: 10,
            color: "#39ff88",
            background: "none",
            border: "2px solid #39ff88",
            padding: "8px 14px",
            cursor: atStart ? "not-allowed" : "pointer",
            opacity: atStart ? 0.3 : 1,
          }}
        >
          {dict.experience.prev}
        </button>
        <button
          type="button"
          className="pixel-font"
          disabled={atEnd}
          onClick={goNext}
          style={{
            fontSize: 10,
            color: "#39ff88",
            background: "none",
            border: "2px solid #39ff88",
            padding: "8px 14px",
            cursor: atEnd ? "not-allowed" : "pointer",
            opacity: atEnd ? 0.3 : 1,
          }}
        >
          {dict.experience.next}
        </button>
      </div>
    </div>
  );
}
