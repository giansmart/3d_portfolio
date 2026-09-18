import { useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const btnStyle = {
  width: 52,
  height: 52,
  background: "rgba(18,23,42,0.85)",
  border: "2px solid #39ff88",
  color: "#39ff88",
  fontSize: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  touchAction: "none",
  userSelect: "none",
  WebkitUserSelect: "none",
  // Stops iOS's long-press callout (copy/look up/translate) from popping up
  // when a direction is held down.
  WebkitTouchCallout: "none",
  WebkitTapHighlightColor: "transparent",
};

const preventContextMenu = (e) => e.preventDefault();

export default function TouchControls({ onMove, onInteract, showInteract }) {
  const { dict } = useLanguage();
  const activeDirs = useRef(new Set());

  const recompute = () => {
    let x = 0;
    let y = 0;
    activeDirs.current.forEach((dir) => {
      x += DIRS[dir].x;
      y += DIRS[dir].y;
    });
    const len = Math.hypot(x, y);
    onMove(len > 0 ? x / len : 0, len > 0 ? y / len : 0);
  };

  const press = (dir) => () => {
    activeDirs.current.add(dir);
    recompute();
  };
  const release = (dir) => () => {
    activeDirs.current.delete(dir);
    recompute();
  };

  return (
    <div className="md:hidden">
      <div className="fixed right-6 bottom-28 z-20" style={{ width: 168, height: 168 }}>
        <button
          style={{ ...btnStyle, position: "absolute", left: 58, top: 0 }}
          onPointerDown={press("up")}
          onPointerUp={release("up")}
          onPointerLeave={release("up")}
          onContextMenu={preventContextMenu}
          aria-label={dict.touch.up}
        >
          &#9650;
        </button>
        <button
          style={{ ...btnStyle, position: "absolute", left: 58, top: 116 }}
          onPointerDown={press("down")}
          onPointerUp={release("down")}
          onPointerLeave={release("down")}
          onContextMenu={preventContextMenu}
          aria-label={dict.touch.down}
        >
          &#9660;
        </button>
        <button
          style={{ ...btnStyle, position: "absolute", left: 0, top: 58 }}
          onPointerDown={press("left")}
          onPointerUp={release("left")}
          onPointerLeave={release("left")}
          onContextMenu={preventContextMenu}
          aria-label={dict.touch.left}
        >
          &#9664;
        </button>
        <button
          style={{ ...btnStyle, position: "absolute", left: 116, top: 58 }}
          onPointerDown={press("right")}
          onPointerUp={release("right")}
          onPointerLeave={release("right")}
          onContextMenu={preventContextMenu}
          aria-label={dict.touch.right}
        >
          &#9654;
        </button>

        {showInteract && (
          <button
            onClick={onInteract}
            onContextMenu={preventContextMenu}
            aria-label={dict.touch.interact}
            className="pixel-font"
            style={{
              // Sits in the empty gap at the middle of the d-pad cross.
              position: "absolute",
              left: 55,
              top: 55,
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "#ffb84d",
              color: "#0b0e1a",
              border: "3px solid #0b0e1a",
              fontSize: 10,
              touchAction: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            E
          </button>
        )}
      </div>
    </div>
  );
}
