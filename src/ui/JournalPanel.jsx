import { useEffect, useRef } from "react";
import { fragments } from "../content/fragments";

export default function JournalPanel({ collectedIds, onClose }) {
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
    >
      <div
        className="w-full overflow-y-auto"
        style={{
          maxWidth: 640,
          maxHeight: "85vh",
          background: "#12172a",
          border: "4px solid #ffb84d",
          boxShadow: "10px 10px 0 rgba(0,0,0,0.5)",
          padding: "32px 36px",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <span className="pixel-font" style={{ fontSize: 13, color: "#ffb84d" }}>
            JOURNAL — {collectedIds.size} / {fragments.length}
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

        {fragments.map((f) => {
          const unlocked = collectedIds.has(f.id);
          return (
            <div key={f.id} style={{ marginBottom: 18, borderLeft: `2px solid ${unlocked ? "#ffb84d" : "#3a4a3a"}`, paddingLeft: 14 }}>
              <div className="pixel-font" style={{ fontSize: 11, color: unlocked ? "#eef1e8" : "#5c6a5c" }}>
                {unlocked ? f.title : "??? — undiscovered fragment"}
              </div>
              {unlocked && (
                <p className="mono-font" style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.6, color: "#cfd6cc" }}>
                  {f.body}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
