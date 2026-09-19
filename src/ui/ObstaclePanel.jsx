import { useEffect, useRef, useState } from "react";
import { obstacles } from "../content/obstacles";
import { MemeCat } from "../game/skins/cssSkin";
import { useLanguage, pickLang } from "../i18n/LanguageContext";

export default function ObstaclePanel({ obstacleId, resolved, onResolve, onClose }) {
  const { dict, lang } = useLanguage();
  const obstacle = pickLang(obstacles[obstacleId], lang);
  const [revealed, setRevealed] = useState(resolved);
  const actionRef = useRef(null);

  useEffect(() => {
    actionRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      role="dialog"
      aria-modal="true"
      aria-label={obstacle.title}
      onClick={onClose}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "absolute", top: -18, left: 28, transform: "scale(1.7)", transformOrigin: "50% 100%", zIndex: 2 }}>
          <MemeCat variant={revealed ? "happy" : "sad"} walking={false} />
        </div>

        <div
          className="flex flex-col"
          style={{
            maxHeight: "85vh",
            background: "#12172a",
            border: "4px solid #ff6b9d",
            boxShadow: "10px 10px 0 rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ padding: "32px 36px 0", flexShrink: 0 }}>
            <span className="pixel-font" style={{ fontSize: 13, color: "#ff6b9d" }}>
              {obstacle.title}
            </span>
          </div>

          <div className="overflow-y-auto" style={{ flex: 1, minHeight: 0, padding: "20px 36px 28px" }}>
            <p className="mono-font" style={{ color: "#cfd6cc", fontSize: 14, lineHeight: 1.7, marginTop: 0 }}>
              {obstacle.problem}
            </p>

            {revealed && (
              <p className="mono-font" style={{ color: "#9be89f", fontSize: 14, lineHeight: 1.7 }}>
                {obstacle.resolution}
              </p>
            )}
          </div>

          {/* One button, one spot, bottom-right — same corner as the d-pad:
              "Debug It" flips in place to "OK" once resolved, instead of
              pairing it with a separate close button elsewhere on screen.
              Tapping the backdrop also dismisses, so mobile users aren't
              stuck here before they've debugged it. */}
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 36px", borderTop: "2px solid #232a3d", flexShrink: 0 }}>
            <button
              ref={actionRef}
              onClick={() => {
                if (revealed) {
                  onClose();
                } else {
                  setRevealed(true);
                  onResolve();
                }
              }}
              className="pixel-font"
              style={{
                fontSize: 11,
                color: "#0b0e1a",
                // OK is the same green as every other modal's OK button;
                // Debug It keeps this panel's pink accent while it's still
                // the call to action.
                background: revealed ? "#39ff88" : "#ff6b9d",
                border: "none",
                padding: "10px 18px",
                minHeight: 40,
                cursor: "pointer",
              }}
            >
              {revealed ? dict.ok : dict.obstacle.debug}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
