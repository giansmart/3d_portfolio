import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { experience } from "../../content/experience";
import { useLanguage, pickLang } from "../../i18n/LanguageContext";

export default function ExperiencePanel({ onNavChange }) {
  const { dict, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const job = experience[index];
  const { title, points } = pickLang(job, lang);
  const atStart = index === 0;
  const atEnd = index === experience.length - 1;

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(experience.length - 1, i + 1)), []);

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
    onNavChange?.({ onPrev: goPrev, onNext: goNext, atStart, atEnd, prevLabel: dict.experience.prev, nextLabel: dict.experience.next });
  }, [onNavChange, goPrev, goNext, atStart, atEnd, dict]);

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

      <ul className="mono-font" style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: "#cfd6cc" }}>
        {points.map((p) => (
          <li key={p} style={{ marginBottom: 6 }}>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
