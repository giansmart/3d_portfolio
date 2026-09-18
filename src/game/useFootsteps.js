import { useEffect, useRef } from "react";
import stepSound from "./sounds/mixkit-hard-pop-click-2364.wav";

const STEP_INTERVAL_MS = 300;
const VOLUME = 0.35;

// Plays a footstep tick on a fixed cadence while `active` is true. Resets
// currentTime instead of cloning nodes — fine for a short percussive click.
export function useFootsteps(active, muted) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(stepSound);
    audio.volume = VOLUME;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!active || muted) return undefined;

    const play = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    play();
    const id = setInterval(play, STEP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [active, muted]);
}
