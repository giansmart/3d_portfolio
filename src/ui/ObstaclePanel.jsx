import { useEffect, useRef, useState } from "react";
import { obstacles } from "../content/obstacles";
import { MemeCat } from "../game/skins/cssSkin";

export default function ObstaclePanel({ obstacleId, resolved, onResolve, onClose }) {
  const obstacle = obstacles[obstacleId];
  const [revealed, setRevealed] = useState(resolved);
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
      aria-label={obstacle.title}
    >
      <div style={{ position: "relative", width: "100%", maxWidth: 560 }}>
        <div style={{ position: "absolute", top: -18, left: 28, transform: "scale(1.7)", transformOrigin: "50% 100%", zIndex: 2 }}>
          <MemeCat variant={revealed ? "happy" : "sad"} walking={false} />
        </div>

        <div
          style={{
            maxHeight: "85vh",
            overflowY: "auto",
            background: "#12172a",
            border: "4px solid #ff6b9d",
            boxShadow: "10px 10px 0 rgba(0,0,0,0.5)",
            padding: "36px 36px 32px",
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
            <span className="pixel-font" style={{ fontSize: 13, color: "#ff6b9d" }}>
              {obstacle.title}
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

          <p className="mono-font" style={{ color: "#cfd6cc", fontSize: 14, lineHeight: 1.7, marginTop: 0 }}>
            {obstacle.problem}
          </p>

          {revealed ? (
            <p className="mono-font" style={{ color: "#9be89f", fontSize: 14, lineHeight: 1.7 }}>
              {obstacle.resolution}
            </p>
          ) : (
            <button
              onClick={() => {
                setRevealed(true);
                onResolve();
              }}
              className="pixel-font"
              style={{
                fontSize: 11,
                color: "#0b0e1a",
                background: "#ff6b9d",
                border: "none",
                padding: "12px 18px",
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              DEBUG IT &#8594;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
