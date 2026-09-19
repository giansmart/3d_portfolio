import { useEffect, useRef, useState } from "react";
import AboutPanel from "./panels/AboutPanel";
import ExperiencePanel from "./panels/ExperiencePanel";
import SkillsPanel from "./panels/SkillsPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import ContactPanel from "./panels/ContactPanel";
import { MemeCat } from "../game/skins/cssSkin";
import { useLanguage } from "../i18n/LanguageContext";

const PANELS = {
  about: AboutPanel,
  experience: ExperiencePanel,
  skills: SkillsPanel,
  projects: ProjectsPanel,
  contact: ContactPanel,
};

// These two are the only station panels with internal pagination — they
// report their prev/next state up via onNavChange so Next can flip into OK
// on the last slide, instead of sitting next to a separate close button.
const PAGINATED_ZONES = new Set(["experience", "projects"]);

const actionBtnStyle = {
  fontSize: 10,
  background: "none",
  padding: "10px 14px",
  minHeight: 40,
  cursor: "pointer",
};

export default function ZonePanel({ zone, onClose }) {
  const { dict } = useLanguage();
  const actionRef = useRef(null);
  const [nav, setNav] = useState(null);
  const paginated = PAGINATED_ZONES.has(zone.id);

  useEffect(() => {
    actionRef.current?.focus();
  }, [zone.id]);

  const Body = PANELS[zone.id];

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      role="dialog"
      aria-modal="true"
      aria-label={zone.title}
      onClick={onClose}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "absolute", top: -14, left: 28, transform: "scale(1.6)", transformOrigin: "50% 100%", zIndex: 2 }}>
          <MemeCat variant={zone.id} walking={false} />
        </div>

        <div
          className="w-full flex flex-col"
          style={{
            maxHeight: "85vh",
            background: "#12172a",
            border: "4px solid #39ff88",
            boxShadow: "10px 10px 0 rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ padding: "28px 36px 0", flexShrink: 0 }}>
            <span className="pixel-font" style={{ fontSize: 13, color: "#39ff88" }}>
              {zone.title}
            </span>
          </div>

          <div className="overflow-y-auto" style={{ flex: 1, minHeight: 0, padding: "20px 36px 28px" }}>
            {Body ? <Body onNavChange={paginated ? setNav : undefined} /> : null}
          </div>

          {/* One action in the bottom-right corner at a time — no X anywhere:
              Prev/Next while there's more to page through, and Next flips
              into OK on the last slide. Panels with nothing to page through
              just show OK. Tapping the backdrop also dismisses. */}
          <div className="flex items-center flex-wrap justify-end" style={{ gap: 10, padding: "16px 36px", borderTop: "2px solid #232a3d", flexShrink: 0 }}>
            {paginated && nav ? (
              <>
                <button
                  type="button"
                  className="pixel-font"
                  disabled={nav.atStart}
                  onClick={nav.onPrev}
                  style={{
                    ...actionBtnStyle,
                    color: "#39ff88",
                    border: "2px solid #39ff88",
                    opacity: nav.atStart ? 0.3 : 1,
                    cursor: nav.atStart ? "not-allowed" : "pointer",
                  }}
                >
                  {nav.prevLabel}
                </button>
                <button
                  ref={actionRef}
                  type="button"
                  className="pixel-font"
                  onClick={nav.atEnd ? onClose : nav.onNext}
                  style={{ ...actionBtnStyle, color: "#0b0e1a", background: "#39ff88", border: "none" }}
                >
                  {nav.atEnd ? dict.ok : nav.nextLabel}
                </button>
              </>
            ) : (
              <button
                ref={actionRef}
                onClick={onClose}
                className="pixel-font"
                style={{ ...actionBtnStyle, color: "#0b0e1a", background: "#39ff88", border: "none" }}
              >
                {dict.ok}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
