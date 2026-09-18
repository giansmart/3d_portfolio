import { useCallback, useEffect, useRef } from "react";
import { isTypingTarget } from "./domUtils";

const KEY_MAP = {
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

// Keyboard input lives in a ref (not state) so a keypress never triggers a
// re-render on its own — the game loop polls getVector() every frame instead.
export function useInput() {
  const keys = useRef(new Set());
  const touch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onKeyDown = (e) => {
      if (isTypingTarget(e.target)) return;
      const dir = KEY_MAP[e.code];
      if (!dir) return;
      keys.current.add(dir);
      e.preventDefault();
    };
    const onKeyUp = (e) => {
      if (isTypingTarget(e.target)) return;
      const dir = KEY_MAP[e.code];
      if (dir) keys.current.delete(dir);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const setTouchVector = useCallback((x, y) => {
    touch.current.x = x;
    touch.current.y = y;
  }, []);

  const getVector = useCallback(() => {
    let x = (keys.current.has("right") ? 1 : 0) - (keys.current.has("left") ? 1 : 0);
    let y = (keys.current.has("down") ? 1 : 0) - (keys.current.has("up") ? 1 : 0);

    if (x === 0 && y === 0) {
      x = touch.current.x;
      y = touch.current.y;
    }

    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    return { x, y };
  }, []);

  return { getVector, setTouchVector };
}
