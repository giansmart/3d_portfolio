export function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

// Moves `pos` by `delta`, resolving one axis at a time so sliding along a
// wall feels natural instead of stopping dead on diagonal collisions.
// `corridorOk`, if given, additionally gates each axis on the player's
// center point staying within the walkable leash around the river path.
export function moveWithCollisions(pos, size, delta, solids, bounds, corridorOk) {
  let { x, y } = pos;
  const half = { x: size.w / 2, y: size.h / 2 };

  const tryX = clamp(x + delta.x, bounds.minX, bounds.maxX - size.w);
  const boxX = { x: tryX, y, w: size.w, h: size.h };
  const centerX = { x: tryX + half.x, y: y + half.y };
  if (!solids.some((s) => rectsOverlap(boxX, s)) && (!corridorOk || corridorOk(centerX))) x = tryX;

  const tryY = clamp(y + delta.y, bounds.minY, bounds.maxY - size.h);
  const boxY = { x, y: tryY, w: size.w, h: size.h };
  const centerY = { x: x + half.x, y: tryY + half.y };
  if (!solids.some((s) => rectsOverlap(boxY, s)) && (!corridorOk || corridorOk(centerY))) y = tryY;

  return { x, y };
}
