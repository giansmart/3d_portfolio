import { useEffect, useState } from "react";
import { projects } from "../../content/projects";
import { useLanguage, pickLang } from "../../i18n/LanguageContext";

export default function ProjectsPanel() {
  const { dict, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const localized = pickLang(project, lang);
  const atStart = index === 0;
  const atEnd = index === projects.length - 1;

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(projects.length - 1, i + 1));

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
        {dict.projects.counter(index + 1, projects.length)}
      </div>

      <div className="pixel-font" style={{ fontSize: 15, color: "#39ff88", marginBottom: 12, lineHeight: 1.6 }}>
        {localized.title}
      </div>

      <p className="mono-font" style={{ color: "#cfd6cc", fontSize: 13, lineHeight: 1.7, marginTop: 0 }}>
        {localized.desc}
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0 24px" }}>
        {project.tags.map((t) => (
          <span key={t} className="pixel-font" style={{ fontSize: 9, color: "#9aa39a", border: "2px solid #3a4a3a", padding: "5px 10px" }}>
            {t}
          </span>
        ))}
      </div>

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
          {dict.projects.prev}
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
          {dict.projects.next}
        </button>
      </div>
    </div>
  );
}
