// True when a keystroke should go to a form field instead of the game —
// so WASD/arrows/Enter/Space/J don't get hijacked while typing.
export function isTypingTarget(el) {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}
