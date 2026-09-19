import { useEffect, useRef } from "react";
import { fragments } from "../content/fragments";
import { FRAGMENT_ICONS } from "../game/skins/cssSkin";
import { useLanguage, pickLang } from "../i18n/LanguageContext";

export default function JournalPanel({ collectedIds, onClose }) {
  const { dict, lang } = useLanguage();
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Journal"
      onClick={onClose}
    >
      <div
        className="w-full flex flex-col"
        style={{
          maxWidth: 640,
          maxHeight: "85vh",
          background: "#12172a",
          border: "4px solid #ffb84d",
          boxShadow: "10px 10px 0 rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "28px 36px 0", flexShrink: 0 }}>
          <span className="pixel-font" style={{ fontSize: 13, color: "#ffb84d" }}>
            {dict.journal.title(collectedIds.size, fragments.length)}
          </span>
        </div>

        <div className="overflow-y-auto" style={{ flex: 1, minHeight: 0, padding: "20px 36px 28px" }}>
          {fragments.map((f) => {
            const unlocked = collectedIds.has(f.id);
            const localized = pickLang(f, lang);
            return (
              <div
                key={f.id}
                className="flex items-start"
                style={{ gap: 12, marginBottom: 18, borderLeft: `2px solid ${unlocked ? "#ffb84d" : "#3a4a3a"}`, paddingLeft: 14 }}
              >
                {unlocked && FRAGMENT_ICONS[f.id] && (
                  <img src={FRAGMENT_ICONS[f.id]} alt="" draggable={false} style={{ width: 36, height: 36, flexShrink: 0 }} />
                )}
                <div>
                  <div className="pixel-font" style={{ fontSize: 11, color: unlocked ? "#eef1e8" : "#5c6a5c" }}>
                    {unlocked ? localized.title : dict.journal.locked}
                  </div>
                  {unlocked && (
                    <p className="mono-font" style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.6, color: "#cfd6cc" }}>
                      {localized.body}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Same bottom-right spot as the other modals — same corner as the
            d-pad. No X anywhere: OK is the one action, tapping the backdrop
            also dismisses. */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 36px", borderTop: "2px solid #232a3d", flexShrink: 0 }}>
          <button
            ref={closeRef}
            onClick={onClose}
            className="pixel-font"
            style={{
              fontSize: 11,
              color: "#0b0e1a",
              background: "#39ff88",
              border: "none",
              padding: "10px 18px",
              minHeight: 40,
              cursor: "pointer",
            }}
          >
            {dict.ok}
          </button>
        </div>
      </div>
    </div>
  );
}
