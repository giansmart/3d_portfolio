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
export function moveWithCollisions(pos, size, delta, solids, bounds) {
  let { x, y } = pos;

  const tryX = clamp(x + delta.x, bounds.minX, bounds.maxX - size.w);
  const boxX = { x: tryX, y, w: size.w, h: size.h };
  if (!solids.some((s) => rectsOverlap(boxX, s))) x = tryX;

  const tryY = clamp(y + delta.y, bounds.minY, bounds.maxY - size.h);
  const boxY = { x, y: tryY, w: size.w, h: size.h };
  if (!solids.some((s) => rectsOverlap(boxY, s))) y = tryY;

  return { x, y };
}
