import { useEffect, useRef } from "react";
import AboutPanel from "./panels/AboutPanel";
import ExperiencePanel from "./panels/ExperiencePanel";
import SkillsPanel from "./panels/SkillsPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import ContactPanel from "./panels/ContactPanel";
import { MemeCat } from "../game/skins/cssSkin";

const PANELS = {
  about: AboutPanel,
  experience: ExperiencePanel,
  skills: SkillsPanel,
  projects: ProjectsPanel,
  contact: ContactPanel,
};

export default function ZonePanel({ zone, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, [zone.id]);

  const Body = PANELS[zone.id];

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      role="dialog"
      aria-modal="true"
      aria-label={zone.title}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 640 }}>
        <div style={{ position: "absolute", top: -14, left: 28, transform: "scale(1.6)", transformOrigin: "50% 100%", zIndex: 2 }}>
          <MemeCat variant={zone.id} walking={false} />
        </div>

        <div
          className="w-full overflow-y-auto"
          style={{
            maxHeight: "85vh",
            background: "#12172a",
            border: "4px solid #39ff88",
            boxShadow: "10px 10px 0 rgba(0,0,0,0.5)",
            padding: "32px 36px",
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
            <span className="pixel-font" style={{ fontSize: 13, color: "#39ff88" }}>
              {zone.title}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              className="pixel-font"
              style={{
                fontSize: 11,
                color: "#9aa39a",
                background: "none",
                border: "2px solid #3a4a3a",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              ESC / &#10005;
            </button>
          </div>
          {Body ? <Body /> : null}
        </div>
      </div>
    </div>
  );
}
