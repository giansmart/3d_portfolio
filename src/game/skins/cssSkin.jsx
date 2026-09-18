// This file is the ONLY place that knows how the world looks. Everything in
// game/*.js is skin-agnostic (positions, collision, input) so this can be
// swapped for a real pixel-art tileset later without touching game logic.
import { useEffect, useState } from "react";
import station1 from "../memecats/memecat-station1.png";
import station2 from "../memecats/memecat-station2.png";
import station3 from "../memecats/memecat-station3.png";
import station4 from "../memecats/memecat-station4.png";
import station5 from "../memecats/memecat-station5.png";
import sadCat from "../memecats/memecat-sad.png";
import happyCat from "../memecats/memecat-happy.png";
import walk01 from "../memecats/frames/walk-01.png";
import walk02 from "../memecats/frames/walk-02.png";
import walk03 from "../memecats/frames/walk-03.png";
import walk04 from "../memecats/frames/walk-04.png";
import walk05 from "../memecats/frames/walk-05.png";
import walk06 from "../memecats/frames/walk-06.png";
import walk07 from "../memecats/frames/walk-07.png";
import walk08 from "../memecats/frames/walk-08.png";
import walk09 from "../memecats/frames/walk-09.png";
import walk10 from "../memecats/frames/walk-10.png";

const ACCENT = "#39ff88";
const IDLE = "#7a8a7a";

export function Ground() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: "#152a1c",
        backgroundImage:
          "repeating-linear-gradient(0deg, #152a1c 0px, #152a1c 32px, #1b3423 32px, #1b3423 64px), repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 2px, transparent 2px, transparent 64px)",
      }}
    />
  );
}

export function River({ width, height }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0" style={{ width, height }}>
      <defs>
        <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#12395c" />
          <stop offset="100%" stopColor="#1a5276" />
        </linearGradient>
      </defs>
      <path
        d="M 180 1225 C 500 1050, 550 500, 815 400 C 1050 320, 1150 700, 1535 750 C 1750 780, 1780 450, 1955 380 C 2080 340, 2150 700, 2185 950"
        fill="none"
        stroke="url(#riverGrad)"
        strokeWidth="66"
        strokeLinecap="round"
      />
      <path
        d="M 180 1225 C 500 1050, 550 500, 815 400 C 1050 320, 1150 700, 1535 750 C 1750 780, 1780 450, 1955 380 C 2080 340, 2150 700, 2185 950"
        fill="none"
        stroke="#5ec8e0"
        strokeWidth="8"
        strokeDasharray="4 26"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

function BuildingIcon({ kind, lit }) {
  switch (kind) {
    case "house":
      return (
        <div style={{ position: "relative", width: 56, height: 52 }}>
          <div style={{ position: "absolute", left: 0, top: 16, width: 56, height: 36, background: "#2a7a4f", boxShadow: "0 0 0 3px #0b0e1a" }} />
          <div style={{ position: "absolute", left: -4, top: 0, width: 64, height: 20, background: "#d97757", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
          <div style={{ position: "absolute", left: 24, top: 34, width: 10, height: 18, background: "#0b0e1a" }} />
        </div>
      );
    case "archive":
      return (
        <div style={{ position: "relative", width: 56, height: 52, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: 3 }}>
          <div style={{ width: 56, height: 12, background: "#8a6d3f", boxShadow: "0 0 0 2px #0b0e1a" }} />
          <div style={{ width: 46, height: 12, background: "#a8854f", boxShadow: "0 0 0 2px #0b0e1a" }} />
          <div style={{ width: 36, height: 12, background: "#6b5433", boxShadow: "0 0 0 2px #0b0e1a" }} />
          <div style={{ width: 26, height: 12, background: "#8a6d3f", boxShadow: "0 0 0 2px #0b0e1a" }} />
        </div>
      );
    case "grove":
      return (
        <div style={{ position: "relative", width: 56, height: 52 }}>
          <div style={{ position: "absolute", left: 24, top: 30, width: 8, height: 22, background: "#5a3d24" }} />
          <div style={{ position: "absolute", left: 10, top: 8, width: 36, height: 26, borderRadius: "50%", background: "#2a7a4f", boxShadow: "0 0 0 2px #0b0e1a" }} />
          <div style={{ position: "absolute", left: 2, top: 18, width: 24, height: 20, borderRadius: "50%", background: "#338a58", boxShadow: "0 0 0 2px #0b0e1a" }} />
          <div style={{ position: "absolute", left: 30, top: 18, width: 24, height: 20, borderRadius: "50%", background: "#338a58", boxShadow: "0 0 0 2px #0b0e1a" }} />
        </div>
      );
    case "workshop":
      return (
        <div style={{ position: "relative", width: 56, height: 52 }}>
          <div style={{ position: "absolute", left: 0, top: 16, width: 56, height: 36, background: "#3a4a5c", boxShadow: "0 0 0 3px #0b0e1a" }} />
          <div style={{ position: "absolute", left: -4, top: 0, width: 64, height: 20, background: "#ffb84d", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
          <div style={{ position: "absolute", left: 16, top: 26, width: 24, height: 16, background: "#0b0e1a" }} />
        </div>
      );
    case "beacon":
      return (
        <div style={{ position: "relative", width: 32, height: 60 }} className={lit ? "beacon-lit" : undefined}>
          <div style={{ position: "absolute", left: 8, top: 10, width: 16, height: 50, background: "#3a3f4d", boxShadow: "0 0 0 2px #0b0e1a" }} />
          <div
            style={{
              position: "absolute",
              left: 6,
              top: 0,
              width: 20,
              height: 12,
              borderRadius: "50%",
              background: "#ffb84d",
              boxShadow: lit ? "0 0 20px 8px rgba(255,184,77,0.9)" : "0 0 8px 2px rgba(255,184,77,0.6)",
            }}
          />
        </div>
      );
    default:
      return null;
  }
}

const BUILDING_SCALE = 1.5;

export function ZoneBuilding({ zone, active, lit }) {
  return (
    <div className="absolute flex flex-col items-center gap-3" style={{ left: zone.x - 20, top: zone.y - 30, width: zone.w + 40 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          background: "rgba(11,14,26,0.55)",
          borderRadius: 6,
          boxShadow: "0 6px 14px rgba(0,0,0,0.45)",
          border: `3px solid ${active ? ACCENT : IDLE}`,
          transition: "border-color 0.15s",
          transform: `scale(${BUILDING_SCALE})`,
          transformOrigin: "50% 100%",
        }}
      >
        <BuildingIcon kind={zone.kind} lit={lit} />
      </div>
      <span className="pixel-font" style={{ fontSize: 12, color: "#eef1e8", letterSpacing: 1, textAlign: "center" }}>
        {zone.label.toUpperCase()}
      </span>
    </div>
  );
}

export function ObstacleMarker({ x, y, active, resolved, title }) {
  return (
    <div className="absolute flex flex-col items-center gap-3" style={{ left: x - 48, top: y - 66, width: 96 }}>
      <div
        style={{
          position: "relative",
          width: 56,
          height: 52,
          transform: `scale(${BUILDING_SCALE})`,
          transformOrigin: "50% 100%",
          filter: active ? "brightness(1.15)" : "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 6,
            width: 0,
            height: 0,
            borderLeft: "28px solid transparent",
            borderRight: "28px solid transparent",
            borderBottom: `44px solid ${resolved ? "#39ff88" : "#ff6b9d"}`,
          }}
        />
        <span
          className="pixel-font"
          style={{ position: "absolute", left: 22, top: 30, fontSize: 16, color: "#0b0e1a" }}
        >
          {resolved ? "✓" : "!"}
        </span>
      </div>
      <span className="pixel-font" style={{ fontSize: 11, color: resolved ? "#39ff88" : "#ff6b9d", letterSpacing: 1, textAlign: "center" }}>
        {title.toUpperCase()}
      </span>
    </div>
  );
}

// Minimalist "Roblox-ish" NPC: blocky head + torso + limbs, one flat accent
// color per person, no facial detail beyond two dot eyes. Recolorable via
// PERSON_COLORS below instead of a real photo.
export const PERSON_COLORS = {
  "mark-waldhauser": "#7dd3fc",
  "naresh-kuppusamy": "#a78bfa",
  "juan-carlos-castillo": "#5eead4",
  "christian-rivera": "#f0abfc",
};

function PersonFigure({ color, active }) {
  return (
    <div style={{ position: "relative", width: 34, height: 50, filter: active ? "brightness(1.2)" : "none" }}>
      <div style={{ position: "absolute", left: 9, top: 0, width: 16, height: 14, borderRadius: 3, background: "#f2d9b8", boxShadow: "0 0 0 2px #0b0e1a" }}>
        <div style={{ position: "absolute", left: 4, top: 6, width: 2, height: 2, borderRadius: "50%", background: "#0b0e1a" }} />
        <div style={{ position: "absolute", left: 10, top: 6, width: 2, height: 2, borderRadius: "50%", background: "#0b0e1a" }} />
      </div>
      <div style={{ position: "absolute", left: 6, top: 15, width: 22, height: 20, borderRadius: 3, background: color, boxShadow: "0 0 0 2px #0b0e1a" }} />
      <div style={{ position: "absolute", left: 1, top: 16, width: 6, height: 16, borderRadius: 2, background: color, boxShadow: "0 0 0 2px #0b0e1a" }} />
      <div style={{ position: "absolute", left: 27, top: 16, width: 6, height: 16, borderRadius: 2, background: color, boxShadow: "0 0 0 2px #0b0e1a" }} />
      <div style={{ position: "absolute", left: 8, top: 35, width: 8, height: 15, borderRadius: 2, background: "#2b2d33", boxShadow: "0 0 0 2px #0b0e1a" }} />
      <div style={{ position: "absolute", left: 18, top: 35, width: 8, height: 15, borderRadius: 2, background: "#2b2d33", boxShadow: "0 0 0 2px #0b0e1a" }} />
    </div>
  );
}

export function PersonMarker({ x, y, active, firstName, color }) {
  return (
    <div className="absolute flex flex-col items-center gap-2" style={{ left: x - 30, top: y - 62, width: 60 }}>
      <div style={{ transform: `scale(${BUILDING_SCALE})`, transformOrigin: "50% 100%" }}>
        <PersonFigure color={color} active={active} />
      </div>
      <span className="pixel-font" style={{ fontSize: 11, color: active ? color : "#eef1e8", letterSpacing: 1, textAlign: "center" }}>
        {firstName.toUpperCase()}
      </span>
    </div>
  );
}

// In-world speech bubble — anchored just above the NPC's head via
// translateY(-100%), so it grows upward as the quote gets longer instead of
// drifting down into the character.
export function DialogueBubble({ x, y, name, quote, accent }) {
  return (
    <div className="absolute" style={{ left: x - 160, top: y - 46, width: 320, zIndex: 5 }}>
      <div style={{ position: "relative", transform: "translateY(-100%)" }}>
        <div
          style={{
            position: "relative",
            background: "#12172a",
            border: `3px solid ${accent}`,
            borderRadius: 10,
            padding: "14px 16px",
            boxShadow: "6px 6px 0 rgba(0,0,0,0.45)",
          }}
        >
          <div className="pixel-font" style={{ fontSize: 10, color: accent, marginBottom: 8 }}>
            {name.toUpperCase()}
          </div>
          <p className="mono-font" style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#eef1e8" }}>
            &#8220;{quote}&#8221;
          </p>
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: -14,
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: `14px solid ${accent}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: -9,
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "10px solid #12172a",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function FragmentShard({ x, y }) {
  return (
    <div
      className="absolute fragment-pulse"
      style={{ left: x - 17, top: y - 17, width: 34, height: 34, filter: "drop-shadow(0 0 8px rgba(255,184,77,0.75))" }}
    >
      <svg viewBox="0 0 34 34" width="34" height="34" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="gemGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff2d0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffb84d" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="17" cy="17" r="17" fill="url(#gemGlow)" />
        {/* faceted gem body */}
        <polygon points="17,4 25,13 17,30 9,13" fill="#0b0e1a" transform="translate(0.8,0.8)" opacity="0.5" />
        <polygon points="17,4 25,13 17,16" fill="#fff2d0" />
        <polygon points="17,4 9,13 17,16" fill="#ffd98a" />
        <polygon points="9,13 17,16 17,30" fill="#e0942f" />
        <polygon points="25,13 17,16 17,30" fill="#b8752a" />
        <polygon points="17,4 25,13 17,30 9,13" fill="none" stroke="#0b0e1a" strokeWidth="1.4" strokeLinejoin="round" />
        {/* sparkle accents */}
        <path d="M28 5 L29 8.5 L32.5 9.5 L29 10.5 L28 14 L27 10.5 L23.5 9.5 L27 8.5 Z" fill="#fff8e8" opacity="0.9" />
        <path d="M5 23 L5.7 25.2 L8 25.9 L5.7 26.6 L5 28.8 L4.3 26.6 L2 25.9 L4.3 25.2 Z" fill="#fff8e8" opacity="0.7" />
      </svg>
    </div>
  );
}

// Deliberately janky "meme cat" sprites: a mismatched sticker-scrap patch
// behind an off-center head/body, uneven ears, lopsided eyes. One variant
// per zone id, plus "walk" for the default roaming pose. `steps(2)` on the
// walk animation is the point — a chunky flipbook stutter, not a smooth tween.
const CAT_VARIANTS = {
  walk: { body: "#d97c3f", shade: "#b8622c", patch: "#f4e6c9", accent: "#3a2418" },
  about: { body: "#8a8f99", shade: "#6f747d", patch: "#e8e4da", accent: "#2b2d33" },
  experience: { body: "#232228", shade: "#141317", patch: "#cfc9bb", accent: "#39ff88" },
  skills: { body: "#c9a24b", shade: "#a3803a", patch: "#efe7d0", accent: "#3a2f10" },
  projects: { body: "#e07b39", shade: "#bd6127", patch: "#fff4dd", accent: "#0b0e1a" },
  contact: { body: "#f2f2ec", shade: "#cfc9bb", patch: "#d8d2c2", accent: "#ffb84d" },
  sad: { body: "#8a8f99", shade: "#6f747d", patch: "#e0d8d8", accent: "#4a2e34" },
  happy: { body: "#f4c542", shade: "#d9a52c", patch: "#fff8e0", accent: "#3a2f10" },
};

function MemeCatCss({ variant = "walk", walking = false }) {
  const c = CAT_VARIANTS[variant] || CAT_VARIANTS.walk;
  return (
    <div className={walking ? "meme-cat meme-cat-walk" : "meme-cat"} style={{ position: "relative", width: 46, height: 46 }}>
      {/* poorly-cut sticker scrap behind the cat, on purpose */}
      <div
        style={{
          position: "absolute",
          left: -7,
          top: 3,
          width: 58,
          height: 40,
          background: c.patch,
          clipPath: "polygon(9% 0%, 100% 6%, 95% 90%, 3% 100%, 0% 55%)",
          opacity: 0.85,
        }}
      />
      {/* body, offset and rotated as if pasted from a different crop */}
      <div
        style={{
          position: "absolute",
          left: 8,
          top: 20,
          width: 30,
          height: 22,
          background: c.body,
          borderRadius: "42% 42% 46% 46%",
          transform: "rotate(4deg)",
          boxShadow: "0 0 0 2px #0b0e1a",
        }}
      />
      {/* head */}
      <div
        style={{
          position: "absolute",
          left: 3,
          top: -1,
          width: 34,
          height: 26,
          background: c.body,
          borderRadius: "50% 50% 46% 46%",
          transform: "rotate(-6deg)",
          boxShadow: "0 0 0 2px #0b0e1a",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -3,
            top: -9,
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "3px solid transparent",
            borderBottom: `14px solid ${c.shade}`,
            transform: "rotate(-16deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -2,
            top: -5,
            width: 0,
            height: 0,
            borderLeft: "4px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: `11px solid ${c.body}`,
            transform: "rotate(12deg)",
          }}
        />
        <div style={{ position: "absolute", left: 7, top: 10, width: 6, height: 7, borderRadius: "50%", background: c.accent }} />
        <div style={{ position: "absolute", left: 19, top: 9, width: 4, height: 5, borderRadius: "50%", background: c.accent }} />
        <div style={{ position: "absolute", left: 13, top: 15, width: 4, height: 3, background: "#ff9db0" }} />
      </div>
      {/* uneven stray whiskers */}
      <div style={{ position: "absolute", left: -5, top: 12, width: 13, height: 1, background: c.accent, transform: "rotate(6deg)", opacity: 0.8 }} />
      <div style={{ position: "absolute", right: -6, top: 15, width: 10, height: 1, background: c.accent, transform: "rotate(-11deg)", opacity: 0.8 }} />
    </div>
  );
}

const WALK_FRAMES = [walk01, walk02, walk03, walk04, walk05, walk06, walk07, walk08, walk09, walk10];
const WALK_FRAME_MS = 130;

// Real photos, added incrementally per station — until a station gets one,
// it keeps the CSS-drawn cat above.
const CAT_PHOTOS = {
  about: station1,
  experience: station2,
  skills: station3,
  projects: station4,
  contact: station5,
  sad: sadCat,
  happy: happyCat,
};

function MemeCatPhoto({ src, walking }) {
  return (
    <div className={walking ? "meme-cat meme-cat-walk" : "meme-cat"} style={{ position: "relative", width: 46, height: 46 }}>
      {/* same pasted-scrap backing as the CSS cats, so the two styles sit together */}
      <div
        style={{
          position: "absolute",
          left: -7,
          top: 3,
          width: 58,
          height: 40,
          background: "#f4e6c9",
          clipPath: "polygon(9% 0%, 100% 6%, 95% 90%, 3% 100%, 0% 55%)",
          opacity: 0.85,
        }}
      />
      <img
        src={src}
        alt=""
        draggable={false}
        style={{ position: "relative", width: "100%", height: "100%", objectFit: "contain", userSelect: "none", pointerEvents: "none" }}
      />
    </div>
  );
}

export function MemeCat({ variant = "walk", walking = false }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (variant !== "walk" || !walking) return undefined;
    const id = setInterval(() => setFrame((f) => (f + 1) % WALK_FRAMES.length), WALK_FRAME_MS);
    return () => clearInterval(id);
  }, [variant, walking]);

  if (variant === "walk") {
    return <MemeCatPhoto src={WALK_FRAMES[walking ? frame : 0]} walking={walking} />;
  }
  if (CAT_PHOTOS[variant]) {
    return <MemeCatPhoto src={CAT_PHOTOS[variant]} walking={false} />;
  }
  return <MemeCatCss variant={variant} walking={walking} />;
}

const PLAYER_SPRITE_SCALE = 1.6;

export function PlayerSprite({ x, y, variant, walking }) {
  return (
    <div
      className="absolute"
      style={{ left: x - 6, top: y - 2, width: 46, height: 46, transform: `scale(${PLAYER_SPRITE_SCALE})`, transformOrigin: "50% 100%" }}
    >
      <MemeCat variant={variant} walking={walking} />
    </div>
  );
}
