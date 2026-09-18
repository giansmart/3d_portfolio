import { useEffect, useRef } from "react";

// Runs `callback(dt)` every animation frame while `active` is true.
// dt is clamped so a dropped/backgrounded frame can't cause a big jump.
export function useGameLoop(callback, active = true) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return undefined;

    let frameId;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      callbackRef.current(dt);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active]);
}
