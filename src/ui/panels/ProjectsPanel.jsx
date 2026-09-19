import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { projects } from "../../content/projects";
import { useLanguage, pickLang } from "../../i18n/LanguageContext";

export default function ProjectsPanel({ onNavChange }) {
  const { dict, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const localized = pickLang(project, lang);
  const atStart = index === 0;
  const atEnd = index === projects.length - 1;

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(projects.length - 1, i + 1)), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "ArrowLeft") goPrev();
      if (e.code === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  // Prev/Next render in ZonePanel's shared bottom-right dock, so they stay
  // put instead of scrolling away with the content below. useLayoutEffect
  // (not useEffect) so the buttons are correct on the very first paint —
  // otherwise ZonePanel briefly renders its no-pagination OK button first.
  useLayoutEffect(() => {
    onNavChange?.({ onPrev: goPrev, onNext: goNext, atStart, atEnd, prevLabel: dict.projects.prev, nextLabel: dict.projects.next });
  }, [onNavChange, goPrev, goNext, atStart, atEnd, dict]);

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

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0 0" }}>
        {project.tags.map((t) => (
          <span key={t} className="pixel-font" style={{ fontSize: 9, color: "#9aa39a", border: "2px solid #3a4a3a", padding: "5px 10px" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
