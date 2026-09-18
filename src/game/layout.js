export const WORLD = { w: 2400, h: 1600 };

export const PLAYER_SIZE = { w: 34, h: 46 };
export const PLAYER_SPEED = 220; // px/sec

export const SPAWN = { x: 230, y: 1120 };

export const ZONES = [
  {
    id: "about",
    label: "About",
    title: "ABOUT — SPAWN POINT",
    kind: "house",
    x: 130,
    y: 1180,
    w: 100,
    h: 90,
    radius: 130,
  },
  {
    id: "experience",
    label: "Experience",
    title: "THE ARCHIVE — EXPERIENCE",
    kind: "archive",
    x: 760,
    y: 240,
    w: 110,
    h: 90,
    radius: 140,
  },
  {
    id: "skills",
    label: "Skills",
    title: "THE GROVE — SKILLS",
    kind: "grove",
    x: 1480,
    y: 880,
    w: 110,
    h: 100,
    radius: 140,
  },
  {
    id: "projects",
    label: "Workshop",
    title: "THE WORKSHOP — PROJECTS",
    kind: "workshop",
    x: 1900,
    y: 260,
    w: 110,
    h: 90,
    radius: 140,
  },
  {
    id: "contact",
    label: "Contact",
    title: "THE BEACON — CONTACT",
    kind: "beacon",
    x: 2150,
    y: 1040,
    w: 70,
    h: 110,
    radius: 150,
  },
];

export function zoneCenter(zone) {
  return { x: zone.x + zone.w / 2, y: zone.y + zone.h / 2 };
}

// Positions only — narrative content lives in content/fragments.js, joined
// by id. Scattered along the open field between zones, clear of every
// building footprint above.
export const FRAGMENT_RADIUS = 40;
export const FRAGMENT_SPOTS = [
  { id: "origin", x: 150, y: 980 },
  { id: "first-cloud", x: 550, y: 700 },
  { id: "the-leap", x: 1250, y: 1150 },
  { id: "back-to-class", x: 1100, y: 500 },
  { id: "curiosity", x: 1750, y: 550 },
  { id: "why-this", x: 2000, y: 850 },
];

// "Career challenge" encounters sitting directly on the river path — not
// zones, not fragments. Narrative content lives in content/obstacles.js,
// joined by id. Positions are points along the River's SVG curve in
// skins/cssSkin.jsx, picked for clearance from every zone/fragment above.
export const OBSTACLES = [
  { id: "latency-wall", x: 679, y: 507, radius: 120 },
  { id: "illegible-script", x: 2104, y: 556, radius: 120 },
];

// People encountered along the river path — LinkedIn recommendations, not
// zones or obstacles. Narrative content lives in content/recommendations.js,
// joined by id. Positions are points on the River curve, spread across all
// four legs of the journey with clearance from everything above.
export const RECOMMENDATION_SPOTS = [
  { id: "mark-waldhauser", x: 465, y: 888, radius: 110 },
  { id: "naresh-kuppusamy", x: 1293, y: 663, radius: 110 },
  { id: "ariela-carrillo", x: 1620, y: 741, radius: 110 },
  { id: "christian-rivera", x: 2152, y: 750, radius: 110 },
];
