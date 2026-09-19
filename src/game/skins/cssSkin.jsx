// This file is the ONLY place that knows how the world looks. Everything in
// game/*.js is skin-agnostic (positions, collision, input) so this can be
// swapped for a real pixel-art tileset later without touching game logic.
import { memo, useEffect, useState } from "react";
import { WORLD } from "../layout";
import { withinCorridor } from "../corridor";
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
import workerIdle from "../worker/frames/worker-idle.png";
import workerChat1 from "../worker/frames/worker-chat-1.png";
import workerChat2 from "../worker/frames/worker-chat-2.png";
import workerIdleWoman from "../worker/frames/worker-idle-woman.png";
import workerChat1Woman from "../worker/frames/worker-chat-1-woman.png";
import workerChat2Woman from "../worker/frames/worker-chat-2-woman.png";

const ACCENT = "#39ff88";
const IDLE = "#7a8a7a";

export function Ground() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: "#33502e",
        // Layered lighting instead of a flat fill: big cool/warm regional
        // tints for uneven "dappled sunlight" feel, medium moss clumps for
        // mid-range color variety, and a fine diagonal grain so no patch of
        // ground reads as a single flat color.
        backgroundImage: [
          "radial-gradient(circle at 15% 22%, rgba(255,241,181,0.07), transparent 32%)",
          "radial-gradient(circle at 78% 12%, rgba(0,12,6,0.22), transparent 34%)",
          "radial-gradient(circle at 58% 55%, rgba(255,241,181,0.06), transparent 30%)",
          "radial-gradient(circle at 22% 78%, rgba(0,12,6,0.2), transparent 34%)",
          "radial-gradient(circle at 85% 82%, rgba(255,241,181,0.07), transparent 30%)",
          "radial-gradient(circle at 40% 92%, rgba(0,12,6,0.18), transparent 32%)",
          "radial-gradient(circle at 8% 55%, rgba(0,12,6,0.15), transparent 28%)",
          "radial-gradient(circle at 92% 45%, rgba(255,241,181,0.05), transparent 26%)",
          "radial-gradient(circle at 34% 40%, rgba(94,138,68,0.4), transparent 11%)",
          "radial-gradient(circle at 66% 30%, rgba(41,74,38,0.4), transparent 9%)",
          "radial-gradient(circle at 48% 68%, rgba(94,138,68,0.35), transparent 10%)",
          "radial-gradient(circle at 20% 60%, rgba(41,74,38,0.35), transparent 9%)",
          "radial-gradient(circle at 80% 65%, rgba(94,138,68,0.3), transparent 10%)",
          "radial-gradient(circle at 6% 12%, rgba(41,74,38,0.3), transparent 9%)",
          "repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 3px)",
        ].join(", "),
        backgroundSize:
          "100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 6px 6px",
        backgroundRepeat:
          "no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, repeat",
      }}
    />
  );
}

// Deterministic background forest: pixel-art conifers, oaks, birches,
// bushes, rocks and flower clusters scattered outside the walkable corridor
// (game/corridor.js) so the river/path reads as a clearing cut through real
// woods — using the same coordinates the game already gates movement with,
// so decoration can never cover the path, a station, an NPC or the cat.
// Every piece gets its own small continuous color/rotation jitter (HSL, not
// a fixed palette swap) so no two trees on the map are identical. Positions
// and colors are computed once at module load (small integer hash, no
// Math.random) so nothing shifts between renders or reloads.
function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function jitter(seed, salt, range) {
  return (seededRandom(seed * 97 + salt * 17) - 0.5) * 2 * range;
}

function hslToHex(h, s, l) {
  const hue = ((h % 360) + 360) % 360;
  const sat = Math.min(100, Math.max(0, s)) / 100;
  const light = Math.min(100, Math.max(0, l)) / 100;
  const k = (n) => (n + hue / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function PineTree({ seed }) {
  const hue = 140 + jitter(seed, 1, 10);
  const sat = 37 + jitter(seed, 2, 6);
  const light = hslToHex(hue, sat, 29 + jitter(seed, 3, 3));
  const mid = hslToHex(hue, sat, 23 + jitter(seed, 4, 3));
  const dark = hslToHex(hue, sat, 17 + jitter(seed, 5, 3));
  const trunk = hslToHex(27 + jitter(seed, 6, 6), 42 + jitter(seed, 7, 8), 21 + jitter(seed, 8, 4));
  return (
    <svg width="34" height="70" viewBox="0 0 34 70" style={{ overflow: "visible" }}>
      <ellipse cx="17" cy="66" rx="13" ry="4" fill="rgba(0,0,0,0.25)" />
      <rect x="14" y="50" width="6" height="14" fill={trunk} />
      <polygon points="17,4 30,26 4,26" fill={dark} stroke="#0b0e1a" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="17,16 28,36 6,36" fill={mid} stroke="#0b0e1a" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="17,28 26,48 8,48" fill={light} stroke="#0b0e1a" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function OakTree({ seed }) {
  const hue = 114 + jitter(seed, 1, 14);
  const sat = 36 + jitter(seed, 2, 8);
  const dark = hslToHex(hue, sat, 26 + jitter(seed, 3, 4));
  const mid = hslToHex(hue, sat, 33 + jitter(seed, 4, 4));
  const light = hslToHex(hue + 6, sat - 4, 55 + jitter(seed, 5, 5));
  const trunk = hslToHex(26 + jitter(seed, 6, 6), 40 + jitter(seed, 7, 8), 23 + jitter(seed, 8, 4));
  return (
    <svg width="44" height="60" viewBox="0 0 44 60" style={{ overflow: "visible" }}>
      <ellipse cx="22" cy="56" rx="15" ry="4.5" fill="rgba(0,0,0,0.25)" />
      <rect x="19" y="36" width="6" height="16" fill={trunk} />
      <ellipse cx="14" cy="24" rx="14" ry="12" fill={dark} stroke="#0b0e1a" strokeWidth="1.5" />
      <ellipse cx="30" cy="24" rx="14" ry="12" fill={dark} stroke="#0b0e1a" strokeWidth="1.5" />
      <ellipse cx="22" cy="14" rx="16" ry="14" fill={mid} stroke="#0b0e1a" strokeWidth="1.5" />
      <ellipse cx="17" cy="9" rx="7" ry="6" fill={light} opacity="0.7" />
    </svg>
  );
}

function BirchTree({ seed }) {
  const hue = 92 + jitter(seed, 1, 10);
  const sat = 34 + jitter(seed, 2, 6);
  const dark = hslToHex(hue, sat, 26 + jitter(seed, 3, 3));
  const mid = hslToHex(hue, sat, 35 + jitter(seed, 4, 3));
  const trunk = hslToHex(40 + jitter(seed, 5, 8), 16 + jitter(seed, 6, 6), 82 + jitter(seed, 7, 5));
  return (
    <svg width="26" height="72" viewBox="0 0 26 72" style={{ overflow: "visible" }}>
      <ellipse cx="13" cy="68" rx="9" ry="3.5" fill="rgba(0,0,0,0.22)" />
      <rect x="10" y="30" width="6" height="38" fill={trunk} stroke="#0b0e1a" strokeWidth="1.2" />
      <rect x="10" y="38" width="6" height="3" fill="#0b0e1a" opacity="0.5" />
      <rect x="10" y="50" width="6" height="3" fill="#0b0e1a" opacity="0.5" />
      <rect x="10" y="60" width="6" height="3" fill="#0b0e1a" opacity="0.5" />
      <ellipse cx="6" cy="20" rx="10" ry="9" fill={dark} stroke="#0b0e1a" strokeWidth="1.4" />
      <ellipse cx="20" cy="18" rx="10" ry="9" fill={dark} stroke="#0b0e1a" strokeWidth="1.4" />
      <ellipse cx="13" cy="10" rx="11" ry="10" fill={mid} stroke="#0b0e1a" strokeWidth="1.4" />
    </svg>
  );
}

function Bush({ seed }) {
  const hue = 122 + jitter(seed, 1, 12);
  const sat = 32 + jitter(seed, 2, 8);
  const dark = hslToHex(hue, sat, 25 + jitter(seed, 3, 3));
  const mid = hslToHex(hue, sat, 32 + jitter(seed, 4, 3));
  return (
    <svg width="30" height="22" viewBox="0 0 30 22" style={{ overflow: "visible" }}>
      <ellipse cx="15" cy="19" rx="13" ry="3" fill="rgba(0,0,0,0.2)" />
      <ellipse cx="8" cy="13" rx="8" ry="7" fill={dark} stroke="#0b0e1a" strokeWidth="1.3" />
      <ellipse cx="21" cy="13" rx="9" ry="7" fill={dark} stroke="#0b0e1a" strokeWidth="1.3" />
      <ellipse cx="14" cy="8" rx="10" ry="8" fill={mid} stroke="#0b0e1a" strokeWidth="1.3" />
    </svg>
  );
}

const ROCK_SHAPES = ["2,15 1,8 6,3 14,2 20,6 21,13 16,16 6,16", "1,13 3,5 10,1 18,3 21,10 17,15 9,16 3,15"];

function Rock({ seed }) {
  const grey = hslToHex(206 + jitter(seed, 1, 10), 6 + jitter(seed, 2, 5), 46 + jitter(seed, 3, 8));
  const highlight = hslToHex(206, 8, 66 + jitter(seed, 4, 6));
  const shape = ROCK_SHAPES[Math.floor(seededRandom(seed * 41 + 3) * ROCK_SHAPES.length)];
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" style={{ overflow: "visible" }}>
      <ellipse cx="11" cy="16.5" rx="9" ry="2.2" fill="rgba(0,0,0,0.22)" />
      <polygon points={shape} fill={grey} stroke="#0b0e1a" strokeWidth="1.3" strokeLinejoin="round" />
      <polygon points="6,3 14,2 12,7 6,8" fill={highlight} opacity="0.5" />
    </svg>
  );
}

const FLOWER_COLORS = ["#f4f1e2", "#f6d78c", "#f2a9c4"];

function FlowerCluster({ seed }) {
  const color = FLOWER_COLORS[Math.floor(seededRandom(seed * 53 + 6) * FLOWER_COLORS.length)];
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" style={{ overflow: "visible" }}>
      <circle cx="3" cy="8" r="2.1" fill={color} stroke="#0b0e1a" strokeWidth="0.8" />
      <circle cx="8" cy="4" r="2.1" fill={color} stroke="#0b0e1a" strokeWidth="0.8" />
      <circle cx="13" cy="9" r="2.1" fill={color} stroke="#0b0e1a" strokeWidth="0.8" />
    </svg>
  );
}

function ForestPiece({ kind, seed }) {
  switch (kind) {
    case "pine":
      return <PineTree seed={seed} />;
    case "oak":
      return <OakTree seed={seed} />;
    case "birch":
      return <BirchTree seed={seed} />;
    case "bush":
      return <Bush seed={seed} />;
    case "rock":
      return <Rock seed={seed} />;
    case "flower":
      return <FlowerCluster seed={seed} />;
    default:
      return null;
  }
}

function buildForestLayer({ cell, margin, anchorSeed, rotationRange, pick }) {
  const pieces = [];
  const cols = Math.ceil(WORLD.w / cell);
  const rows = Math.ceil(WORLD.h / cell);
  let seed = anchorSeed;
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      seed += 1;
      const jitterX = (seededRandom(seed) - 0.5) * cell * 0.85;
      const jitterY = (seededRandom(seed * 7 + 3) - 0.5) * cell * 0.85;
      const x = gx * cell + cell / 2 + jitterX;
      const y = gy * cell + cell / 2 + jitterY;
      if (x < 10 || x > WORLD.w - 10 || y < 10 || y > WORLD.h - 10) continue;
      if (withinCorridor({ x, y }, margin)) continue;
      const scale = 0.8 + seededRandom(seed * 13 + 5) * 0.5;
      const rotate = jitter(seed, 21, rotationRange);
      const kind = pick(seed);
      pieces.push({ id: `${anchorSeed}-${gx}-${gy}`, x, y, scale, rotate, kind, seed });
    }
  }
  return pieces;
}

const BACKGROUND_FOREST = [
  // canopy layer: bigger, further from the path — mixed pines/oaks/birches
  ...buildForestLayer({
    cell: 150,
    margin: 90,
    anchorSeed: 1,
    rotationRange: 4,
    pick: (seed) => {
      const roll = seededRandom(seed * 3 + 2);
      if (roll < 0.4) return "pine";
      if (roll < 0.82) return "oak";
      return "birch";
    },
  }),
  // underbrush layer: smaller, hugs closer to the clearing edge
  ...buildForestLayer({
    cell: 100,
    margin: 40,
    anchorSeed: 9001,
    rotationRange: 6,
    pick: (seed) => {
      const roll = seededRandom(seed * 5 + 4);
      if (roll < 0.45) return "bush";
      if (roll < 0.75) return "rock";
      return "flower";
    },
  }),
];

export const BackgroundForest = memo(function BackgroundForest() {
  return (
    <>
      {BACKGROUND_FOREST.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{ left: p.x - 22, top: p.y - 54, transform: `rotate(${p.rotate}deg) scale(${p.scale})`, transformOrigin: "50% 100%" }}
        >
          <ForestPiece kind={p.kind} seed={p.seed} />
        </div>
      ))}
    </>
  );
});

// A paved road, not a river — dark asphalt with a grain texture (an SVG
// pattern used as the stroke's paint, so the speckle follows the curve
// instead of tiling flat) and the dashed center line reused as lane
// markings. Same layering technique as everything else here: dark edge ->
// flat fill -> texture overlay -> crisp line on top.
export function River({ width, height }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0" style={{ width, height }}>
      <defs>
        <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#302f36" />
          <stop offset="100%" stopColor="#3c3b44" />
        </linearGradient>
        <pattern id="asphaltGrain" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
          <rect x="1" y="1" width="1.6" height="1.6" fill="rgba(255,255,255,0.06)" />
          <rect x="4.5" y="2.5" width="1.3" height="1.3" fill="rgba(0,0,0,0.22)" />
          <rect x="2.5" y="5" width="1.2" height="1.2" fill="rgba(0,0,0,0.16)" />
          <rect x="5.5" y="5.5" width="1" height="1" fill="rgba(255,255,255,0.04)" />
        </pattern>
      </defs>
      <path
        d="M 180 1225 C 500 1050, 550 500, 815 400 C 1050 320, 1150 700, 1535 750 C 1750 780, 1780 450, 1955 380 C 2080 340, 2150 700, 2185 950"
        fill="none"
        stroke="#15151a"
        strokeWidth="76"
        strokeLinecap="round"
      />
      <path
        d="M 180 1225 C 500 1050, 550 500, 815 400 C 1050 320, 1150 700, 1535 750 C 1750 780, 1780 450, 1955 380 C 2080 340, 2150 700, 2185 950"
        fill="none"
        stroke="url(#pathGrad)"
        strokeWidth="66"
        strokeLinecap="round"
      />
      <path
        d="M 180 1225 C 500 1050, 550 500, 815 400 C 1050 320, 1150 700, 1535 750 C 1750 780, 1780 450, 1955 380 C 2080 340, 2150 700, 2185 950"
        fill="none"
        stroke="url(#asphaltGrain)"
        strokeWidth="66"
        strokeLinecap="round"
      />
      <path
        d="M 180 1225 C 500 1050, 550 500, 815 400 C 1050 320, 1150 700, 1535 750 C 1750 780, 1780 450, 1955 380 C 2080 340, 2150 700, 2185 950"
        fill="none"
        stroke="#e9e4d6"
        strokeWidth="6"
        strokeDasharray="18 22"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

// A cozy cottage, not a flat green box — faceted wall/roof shading (same
// light/mid/dark technique as the trees and the obstacle sign) plus a
// chimney and a window so it reads as a home, not a generic hut.
function HouseIcon() {
  return (
    <svg width="56" height="52" viewBox="0 0 56 52" style={{ overflow: "visible" }}>
      <rect x="37" y="2" width="8" height="15" fill="#6b4a3a" stroke="#0b0e1a" strokeWidth="1.5" />
      <polygon points="28,2 54,23 2,23" fill="#8f4a34" stroke="#0b0e1a" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="28,2 2,23 28,23" fill="#ad6247" />
      <rect x="6" y="21" width="44" height="29" fill="#cdb98f" stroke="#0b0e1a" strokeWidth="2" />
      <rect x="38" y="21" width="12" height="29" fill="#b8a37a" />
      <rect x="12" y="28" width="12" height="12" fill="#cfe8e0" stroke="#0b0e1a" strokeWidth="1.5" />
      <line x1="18" y1="28" x2="18" y2="40" stroke="#0b0e1a" strokeWidth="1.2" />
      <line x1="12" y1="34" x2="24" y2="34" stroke="#0b0e1a" strokeWidth="1.2" />
      <rect x="30" y="32" width="12" height="18" fill="#3a2416" stroke="#0b0e1a" strokeWidth="1.5" />
      <circle cx="39" cy="41.5" r="1.3" fill="#e8c468" />
    </svg>
  );
}

// A leaning stack of books instead of a flat tiered box — reads clearly as
// "archive of experience" and gets some color variety instead of one flat
// tan tone repeated four times.
function ArchiveIcon() {
  return (
    <svg width="56" height="52" viewBox="0 0 56 52" style={{ overflow: "visible" }}>
      <rect x="4" y="38" width="48" height="12" fill="#8a5a3f" stroke="#0b0e1a" strokeWidth="2" />
      <rect x="4" y="38" width="48" height="3.5" fill="#a8734f" />
      <rect x="8" y="27" width="40" height="12" fill="#2f6640" stroke="#0b0e1a" strokeWidth="2" />
      <rect x="8" y="27" width="40" height="3.5" fill="#3f8654" />
      <rect x="6" y="16" width="44" height="12" fill="#39536b" stroke="#0b0e1a" strokeWidth="2" />
      <rect x="6" y="16" width="44" height="3.5" fill="#4f7391" />
      <g transform="rotate(-6 28 10)">
        <rect x="10" y="4" width="36" height="11" fill="#c9862f" stroke="#0b0e1a" strokeWidth="2" />
        <rect x="10" y="4" width="36" height="3.2" fill="#e0a44f" />
      </g>
    </svg>
  );
}

function BuildingIcon({ kind, lit }) {
  switch (kind) {
    case "house":
      return <HouseIcon />;
    case "archive":
      return <ArchiveIcon />;
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
      // An envelope, not a lamppost — this is the contact station. The glow
      // dot keeps the "lights up once all fragments are found" payoff.
      return (
        <div style={{ position: "relative", width: 56, height: 52 }} className={lit ? "beacon-lit" : undefined}>
          <div style={{ position: "absolute", left: 0, top: 12, width: 56, height: 38, background: "#eef1e8", boxShadow: "0 0 0 3px #0b0e1a" }} />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 12,
              width: 56,
              height: 26,
              background: "#c7cdbf",
              clipPath: "polygon(0% 0%, 50% 62%, 100% 0%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 42,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ffb84d",
              boxShadow: lit ? "0 0 16px 6px rgba(255,184,77,0.9)" : "0 0 6px 2px rgba(255,184,77,0.55)",
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

// A faceted warning sign, built with the same beveled-polygon language as
// the fragment gem (light/dark facets + hard pixel outline) instead of a
// flat CSS border-triangle, so it reads as part of the same art style.
// A barricade spanning the road, with the warning sign fully embedded in
// its face (the slab is sized to contain the whole triangle, not just its
// base) — not a sign floating next to the path, but the thing blocking it.
export function ObstacleMarker({ x, y, active, resolved, title }) {
  const face = resolved ? "#39ff88" : "#ff6b9d";
  const shade = resolved ? "#1f8f52" : "#b8395f";
  const highlight = resolved ? "#c8ffe0" : "#ffcfe0";
  const glow = resolved ? "rgba(57,255,136,0.55)" : "rgba(255,107,157,0.6)";
  const stone = resolved ? "#5c7a68" : "#6b5860";
  const stoneLight = resolved ? "#7a9c86" : "#8a7480";

  return (
    <div className="absolute flex flex-col items-center gap-3" style={{ left: x - 60, top: y - 72, width: 120 }}>
      <div
        style={{
          position: "relative",
          width: 84,
          height: 60,
          transform: `scale(${BUILDING_SCALE})`,
          transformOrigin: "50% 100%",
          filter: `drop-shadow(0 0 ${active ? 10 : 6}px ${glow})`,
        }}
      >
        <svg width="84" height="60" viewBox="0 0 84 60" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <rect x="1" y="1" width="82" height="58" fill={stone} stroke="#0b0e1a" strokeWidth="2.5" />
          <rect x="1" y="1" width="82" height="6" fill={stoneLight} opacity="0.5" />
          <line x1="1" y1="20" x2="83" y2="20" stroke="#0b0e1a" strokeWidth="1.4" opacity="0.45" />
          <line x1="1" y1="39" x2="83" y2="39" stroke="#0b0e1a" strokeWidth="1.4" opacity="0.45" />
          <line x1="22" y1="1" x2="22" y2="20" stroke="#0b0e1a" strokeWidth="1.1" opacity="0.35" />
          <line x1="50" y1="1" x2="50" y2="20" stroke="#0b0e1a" strokeWidth="1.1" opacity="0.35" />
          <line x1="12" y1="20" x2="12" y2="39" stroke="#0b0e1a" strokeWidth="1.1" opacity="0.35" />
          <line x1="38" y1="20" x2="38" y2="39" stroke="#0b0e1a" strokeWidth="1.1" opacity="0.35" />
          <line x1="65" y1="20" x2="65" y2="39" stroke="#0b0e1a" strokeWidth="1.1" opacity="0.35" />
          <line x1="24" y1="39" x2="24" y2="58" stroke="#0b0e1a" strokeWidth="1.1" opacity="0.35" />
          <line x1="56" y1="39" x2="56" y2="58" stroke="#0b0e1a" strokeWidth="1.1" opacity="0.35" />
        </svg>

        <svg width="56" height="52" viewBox="0 0 56 52" style={{ position: "absolute", left: 14, top: 4, overflow: "visible" }}>
          <polygon points="28,4 52,46 4,46" fill="#0b0e1a" transform="translate(1.5,2)" opacity="0.45" />
          <polygon points="28,4 4,46 28,46" fill={face} />
          <polygon points="28,4 52,46 28,46" fill={shade} />
          <polygon points="28,11 44,41 28,41" fill={highlight} opacity="0.3" />
          <polygon points="28,4 52,46 4,46" fill="none" stroke="#0b0e1a" strokeWidth="3" strokeLinejoin="round" />
          {resolved ? (
            <path d="M18 27 L25 34 L39 18" fill="none" stroke="#0b0e1a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <>
              <rect x="25" y="17" width="6" height="17" fill="#0b0e1a" />
              <rect x="25" y="37" width="6" height="6" fill="#0b0e1a" />
            </>
          )}
        </svg>
      </div>
      <span className="pixel-font" style={{ fontSize: 11, color: face, letterSpacing: 1, textAlign: "center" }}>
        {title.toUpperCase()}
      </span>
    </div>
  );
}

// One recolor-free "office worker" sprite (real pixel art) used for every
// recommendation NPC — kept generic on purpose, no real photos. Idle by
// default; alternates between two talking frames while a dialogue is open.
// Each person still gets their own PERSON_COLORS accent for the marker ring,
// name label and speech bubble.
// eslint-disable-next-line react-refresh/only-export-components -- plain data map, not a component
export const PERSON_COLORS = {
  "mark-waldhauser": "#7dd3fc",
  "naresh-kuppusamy": "#a78bfa",
  "ariela-carrillo": "#5eead4",
  "christian-rivera": "#f0abfc",
};

const WORKER_CHAT_FRAMES = { male: [workerChat1, workerChat2], female: [workerChat1Woman, workerChat2Woman] };
const WORKER_IDLE = { male: workerIdle, female: workerIdleWoman };
const WORKER_CHAT_FRAME_MS = 450;

// Sprite sheet faces right by default; mirrored whenever the cat is
// approaching from the worker's left, so the NPC always faces the cat.
function WorkerFigure({ active, facingLeft, gender = "male" }) {
  const [frame, setFrame] = useState(0);
  const chatFrames = WORKER_CHAT_FRAMES[gender] || WORKER_CHAT_FRAMES.male;

  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => setFrame((f) => (f + 1) % chatFrames.length), WORKER_CHAT_FRAME_MS);
    return () => clearInterval(id);
  }, [active, chatFrames]);

  const src = active ? chatFrames[frame] : WORKER_IDLE[gender] || WORKER_IDLE.male;
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      style={{
        width: 40,
        height: "auto",
        display: "block",
        userSelect: "none",
        pointerEvents: "none",
        transform: facingLeft ? "scaleX(-1)" : "none",
      }}
    />
  );
}

// Small flat-color flag icons, drawn in-line — no font/emoji rendering
// inconsistencies across OS, no extra asset or dependency.
function Flag({ code }) {
  const common = { width: 20, height: 14, style: { boxShadow: "0 0 0 1px rgba(0,0,0,0.5)", display: "block" } };
  if (code === "US") {
    return (
      <svg viewBox="0 0 20 14" {...common}>
        <rect width="20" height="14" fill="#b22234" />
        {[1.08, 3.23, 5.38, 7.54, 9.69, 11.85].map((y) => (
          <rect key={y} y={y} width="20" height="1.08" fill="#fff" />
        ))}
        <rect width="8" height="7.54" fill="#3c3b6e" />
      </svg>
    );
  }
  if (code === "IN") {
    return (
      <svg viewBox="0 0 20 14" {...common}>
        <rect width="20" height="4.67" fill="#ff9933" />
        <rect y="4.67" width="20" height="4.67" fill="#fff" />
        <rect y="9.33" width="20" height="4.67" fill="#138808" />
        <circle cx="10" cy="7" r="1.5" fill="none" stroke="#000080" strokeWidth="0.3" />
      </svg>
    );
  }
  if (code === "PE") {
    return (
      <svg viewBox="0 0 20 14" {...common}>
        <rect width="20" height="14" fill="#fff" />
        <rect width="6.67" height="14" fill="#d91023" />
        <rect x="13.33" width="6.67" height="14" fill="#d91023" />
      </svg>
    );
  }
  if (code === "CR") {
    return (
      <svg viewBox="0 0 20 14" {...common}>
        <rect width="20" height="14" fill="#002b7f" />
        <rect y="2.33" width="20" height="9.33" fill="#fff" />
        <rect y="4.67" width="20" height="4.67" fill="#ce1126" />
      </svg>
    );
  }
  return null;
}

export function PersonMarker({ x, y, active, firstName, country, color, facingLeft, gender }) {
  return (
    <div className="absolute flex flex-col items-center gap-1" style={{ left: x - 34, top: y - 68, width: 68 }}>
      <div style={{ transform: `scale(${BUILDING_SCALE})`, transformOrigin: "50% 100%" }}>
        <WorkerFigure active={active} facingLeft={facingLeft} gender={gender} />
      </div>
      <span
        className="pixel-font"
        style={{ fontSize: 11, color: active ? color : "#eef1e8", letterSpacing: 1, textAlign: "center", display: "flex", alignItems: "center", gap: 6 }}
      >
        {country && <Flag code={country} />}
        {firstName.toUpperCase()}
      </span>
    </div>
  );
}

// In-world speech bubble — anchored well above the NPC's (and cat's) heads
// via translateY(-100%) from a high offset, so it never overlaps either
// character; grows upward as the quote gets longer.
export function DialogueBubble({ x, y, name, company, country, quote, accent, linkedin }) {
  return (
    <div className="absolute" style={{ left: x - 160, top: y - 120, width: 320, zIndex: 5 }}>
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
          <div className="pixel-font" style={{ fontSize: 10, color: accent, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
            {country && <Flag code={country} />}
            {linkedin ? (
              <a href={linkedin} target="_blank" rel="noreferrer" style={{ color: accent, textDecoration: "underline" }}>
                {name.toUpperCase()}
              </a>
            ) : (
              name.toUpperCase()
            )}
          </div>
          {company && (
            <div className="mono-font" style={{ fontSize: 10, color: "#9aa39a", marginBottom: 8 }}>
              {company}
            </div>
          )}
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
    if (!walking) return undefined;
    const id = setInterval(() => setFrame((f) => (f + 1) % WALK_FRAMES.length), WALK_FRAME_MS);
    return () => clearInterval(id);
  }, [walking]);

  // A variant photo (station pose, sad/happy obstacle face) only makes sense
  // while standing still — proximity radii are wide, so without this check
  // the cat would freeze on that photo for a stretch while still walking.
  if (walking || variant === "walk") {
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
