import { ZONES, zoneCenter, FRAGMENT_SPOTS, OBSTACLES, RECOMMENDATION_SPOTS, SPAWN } from "./layout";

// Same multi-segment cubic-bezier curve as the River's SVG "d" path in
// skins/cssSkin.jsx, sampled here so the player's walkable area can hug it.
const RIVER_SEGMENTS = [
  { p0: { x: 180, y: 1225 }, p1: { x: 500, y: 1050 }, p2: { x: 550, y: 500 }, p3: { x: 815, y: 400 } },
  { p0: { x: 815, y: 400 }, p1: { x: 1050, y: 320 }, p2: { x: 1150, y: 700 }, p3: { x: 1535, y: 750 } },
  { p0: { x: 1535, y: 750 }, p1: { x: 1750, y: 780 }, p2: { x: 1780, y: 450 }, p3: { x: 1955, y: 380 } },
  { p0: { x: 1955, y: 380 }, p1: { x: 2080, y: 340 }, p2: { x: 2150, y: 700 }, p3: { x: 2185, y: 950 } },
];

function cubicPoint(seg, t) {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return {
    x: a * seg.p0.x + b * seg.p1.x + c * seg.p2.x + d * seg.p3.x,
    y: a * seg.p0.y + b * seg.p1.y + c * seg.p2.y + d * seg.p3.y,
  };
}

const SAMPLES_PER_SEGMENT = 60;
const riverSamples = RIVER_SEGMENTS.flatMap((seg) =>
  Array.from({ length: SAMPLES_PER_SEGMENT + 1 }, (_, i) => cubicPoint(seg, i / SAMPLES_PER_SEGMENT))
);

// Every point the cat is allowed to wander near: the river itself, plus every
// station/fragment/obstacle/NPC, so the leash hugs the path without ever
// cutting off actual content.
const CORRIDOR_ANCHORS = [...riverSamples, ...ZONES.map(zoneCenter), ...FRAGMENT_SPOTS, ...OBSTACLES, ...RECOMMENDATION_SPOTS, SPAWN];

const CORRIDOR_LEASH = 260;

export function withinCorridor(point) {
  for (const a of CORRIDOR_ANCHORS) {
    if (Math.hypot(point.x - a.x, point.y - a.y) <= CORRIDOR_LEASH) return true;
  }
  return false;
}
