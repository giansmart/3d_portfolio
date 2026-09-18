import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  WORLD,
  PLAYER_SIZE,
  PLAYER_SPEED,
  SPAWN,
  ZONES,
  zoneCenter,
  FRAGMENT_SPOTS,
  FRAGMENT_RADIUS,
  OBSTACLES,
  RECOMMENDATION_SPOTS,
} from "./layout";
import { moveWithCollisions } from "./collision";
import { withinCorridor } from "./corridor";
import { isTypingTarget } from "./domUtils";
import { useGameLoop } from "./useGameLoop";
import { useInput } from "./useInput";
import { useFootsteps } from "./useFootsteps";
import { Ground, River, ZoneBuilding, PlayerSprite, FragmentShard, ObstacleMarker, PersonMarker, DialogueBubble, PERSON_COLORS } from "./skins/cssSkin";
import { fragments } from "../content/fragments";
import { obstacles } from "../content/obstacles";
import { recommendations } from "../content/recommendations";
import rewardSound from "./sounds/mixkit-correct-answer-reward-952.wav";
import Hud from "../ui/Hud";
import ZonePanel from "../ui/ZonePanel";
import TouchControls from "../ui/TouchControls";
import JournalPanel from "../ui/JournalPanel";
import FinalePanel from "../ui/FinalePanel";
import FragmentToast from "../ui/FragmentToast";
import ObstaclePanel from "../ui/ObstaclePanel";
import { useLanguage, pickLang } from "../i18n/LanguageContext";

const SOLIDS = ZONES.map((z) => ({ x: z.x, y: z.y, w: z.w, h: z.h }));
const BOUNDS = { minX: 0, minY: 0, maxX: WORLD.w, maxY: WORLD.h };
const SCROLL_LOOK_RANGE = 260; // how far you can look away from the player with the wheel

function clampCam(v, worldSize, viewportSize) {
  const max = Math.max(0, worldSize - viewportSize);
  return Math.min(Math.max(v, 0), max);
}

function findNearestZone(center) {
  let closest = null;
  let closestDist = Infinity;
  for (const zone of ZONES) {
    const zc = zoneCenter(zone);
    const dist = Math.hypot(center.x - zc.x, center.y - zc.y);
    if (dist < zone.radius && dist < closestDist) {
      closest = zone.id;
      closestDist = dist;
    }
  }
  return closest;
}

function findNearestObstacle(center) {
  let closest = null;
  let closestDist = Infinity;
  for (const ob of OBSTACLES) {
    const dist = Math.hypot(center.x - ob.x, center.y - ob.y);
    if (dist < ob.radius && dist < closestDist) {
      closest = ob.id;
      closestDist = dist;
    }
  }
  return closest;
}

function findNearestPerson(center) {
  let closest = null;
  let closestDist = Infinity;
  for (const spot of RECOMMENDATION_SPOTS) {
    const dist = Math.hypot(center.x - spot.x, center.y - spot.y);
    if (dist < spot.radius && dist < closestDist) {
      closest = spot.id;
      closestDist = dist;
    }
  }
  return closest;
}

const SPAWN_CENTER = { x: SPAWN.x + PLAYER_SIZE.w / 2, y: SPAWN.y + PLAYER_SIZE.h / 2 };
const MUTE_KEY = "gp_portfolio_muted";

export default function World({ onExit }) {
  const rootRef = useRef(null);
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
  const posRef = useRef({ ...SPAWN });
  const [renderPos, setRenderPos] = useState({ ...SPAWN });
  const [nearZoneId, setNearZoneId] = useState(() => findNearestZone(SPAWN_CENTER));
  const nearZoneIdRef = useRef(findNearestZone(SPAWN_CENTER));
  const [nearObstacleId, setNearObstacleId] = useState(null);
  const nearObstacleIdRef = useRef(null);
  const [resolvedObstacles, setResolvedObstacles] = useState(() => new Set());
  const [nearPersonId, setNearPersonId] = useState(null);
  const nearPersonIdRef = useRef(null);
  const [openZoneId, setOpenZoneId] = useState(null);
  const [openObstacleId, setOpenObstacleId] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const movingRef = useRef(false);
  const [collected, setCollected] = useState(() => new Set());
  const [toastTitle, setToastTitle] = useState(null);
  const [showJournal, setShowJournal] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const finaleShownRef = useRef(false);
  const toastTimerRef = useRef(null);
  const rewardAudioRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const { getVector, setTouchVector } = useInput();
  const { lang } = useLanguage();

  // Dialogue bubbles are lightweight — they don't pause the world like the
  // full-screen panels do; you can keep walking, and walking away from the
  // NPC auto-closes them (see the loop below).
  const paused = !!openZoneId || !!openObstacleId || showJournal || showFinale;

  useFootsteps(isMoving && !paused, muted);

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      try {
        localStorage.setItem(MUTE_KEY, next ? "1" : "0");
      } catch {
        // ignore — sound just won't remember across visits
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  useEffect(() => {
    const audio = new Audio(rewardSound);
    audio.volume = 0.5;
    rewardAudioRef.current = audio;
  }, []);

  // Mouse-wheel look: pan the camera vertically without moving the character.
  // Resets the instant the player moves again, so it never fights the follow-cam.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      setScrollOffset((prev) => {
        const next = prev + e.deltaY * 0.8;
        return Math.max(-SCROLL_LOOK_RANGE, Math.min(SCROLL_LOOK_RANGE, next));
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useGameLoop((dt) => {
    if (paused) return;
    const v = getVector();
    const moving = v.x !== 0 || v.y !== 0;
    if (moving !== movingRef.current) {
      movingRef.current = moving;
      setIsMoving(moving);
    }
    if (!moving) return;

    if (scrollOffset !== 0) setScrollOffset(0);

    const delta = { x: v.x * PLAYER_SPEED * dt, y: v.y * PLAYER_SPEED * dt };
    const next = moveWithCollisions(posRef.current, PLAYER_SIZE, delta, SOLIDS, BOUNDS, withinCorridor);
    posRef.current = next;
    setRenderPos(next);

    const center = { x: next.x + PLAYER_SIZE.w / 2, y: next.y + PLAYER_SIZE.h / 2 };
    const closestZone = findNearestZone(center);
    nearZoneIdRef.current = closestZone;
    setNearZoneId(closestZone);

    const closestObstacle = findNearestObstacle(center);
    nearObstacleIdRef.current = closestObstacle;
    setNearObstacleId(closestObstacle);

    const closestPerson = findNearestPerson(center);
    nearPersonIdRef.current = closestPerson;
    setNearPersonId(closestPerson);

    if (collected.size < FRAGMENT_SPOTS.length) {
      for (const spot of FRAGMENT_SPOTS) {
        if (collected.has(spot.id)) continue;
        if (Math.hypot(center.x - spot.x, center.y - spot.y) < FRAGMENT_RADIUS) {
          const nextCollected = new Set(collected).add(spot.id);
          setCollected(nextCollected);
          const frag = fragments.find((f) => f.id === spot.id);
          setToastTitle(pickLang(frag, lang).title);
          clearTimeout(toastTimerRef.current);
          toastTimerRef.current = setTimeout(() => setToastTitle(null), 2500);
          break;
        }
      }
    }
  });

  useEffect(() => {
    if (collected.size === FRAGMENT_SPOTS.length && !finaleShownRef.current) {
      finaleShownRef.current = true;
      setShowFinale(true);
      if (!muted && rewardAudioRef.current) {
        rewardAudioRef.current.currentTime = 0;
        rewardAudioRef.current.play().catch(() => {});
      }
    }
    // muted intentionally excluded — this only fires once, at the moment of
    // completion, using whatever the mute setting is right then.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collected]);

  const interact = useCallback(() => {
    if (nearObstacleIdRef.current) {
      setOpenObstacleId(nearObstacleIdRef.current);
    } else if (nearZoneIdRef.current) {
      setOpenZoneId(nearZoneIdRef.current);
    }
    // People talk automatically on approach — see DialogueBubble below, tied
    // straight to nearPersonId, no key press needed.
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      // Let the contact form (or any field) type freely — only Escape still
      // reaches the game, so it can still close the panel you're typing in.
      if (isTypingTarget(e.target) && e.code !== "Escape") return;
      if (showFinale) {
        if (e.code === "Escape") setShowFinale(false);
        return;
      }
      if (showJournal) {
        if (e.code === "Escape") setShowJournal(false);
        return;
      }
      if (openObstacleId) {
        if (e.code === "Escape" || e.code === "Enter") setOpenObstacleId(null);
        return;
      }
      if (openZoneId) {
        if (e.code === "Escape" || e.code === "Enter") setOpenZoneId(null);
        return;
      }
      if (e.code === "KeyE" || e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        interact();
      }
      if (e.code === "KeyJ") setShowJournal(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [interact, openZoneId, openObstacleId, showJournal, showFinale]);

  const camX = clampCam(renderPos.x + PLAYER_SIZE.w / 2 - viewport.w / 2, WORLD.w, viewport.w);
  const camY = clampCam(renderPos.y + PLAYER_SIZE.h / 2 - viewport.h / 2 + scrollOffset, WORLD.h, viewport.h);
  const activeZone = ZONES.find((z) => z.id === openZoneId) || null;
  const nearZone = ZONES.find((z) => z.id === nearZoneId) || null;
  const allFound = collected.size === FRAGMENT_SPOTS.length;

  const promptLabel = nearObstacleId ? pickLang(obstacles[nearObstacleId], lang).title : nearZone?.label.toUpperCase();
  const catVariant = nearObstacleId ? (resolvedObstacles.has(nearObstacleId) ? "happy" : "sad") : nearZoneId || "walk";

  return (
    <div ref={rootRef} className="relative w-screen h-screen overflow-hidden" style={{ background: "#152a1c" }}>
      <div
        className="absolute top-0 left-0"
        style={{ width: WORLD.w, height: WORLD.h, transform: `translate3d(${-camX}px, ${-camY}px, 0)` }}
      >
        <Ground />
        <River width={WORLD.w} height={WORLD.h} />
        {FRAGMENT_SPOTS.filter((s) => !collected.has(s.id)).map((s) => (
          <FragmentShard key={s.id} x={s.x} y={s.y} />
        ))}
        {OBSTACLES.map((ob) => (
          <ObstacleMarker
            key={ob.id}
            x={ob.x}
            y={ob.y}
            active={ob.id === nearObstacleId}
            resolved={resolvedObstacles.has(ob.id)}
            title={pickLang(obstacles[ob.id], lang).title}
          />
        ))}
        {RECOMMENDATION_SPOTS.map((spot) => {
          const person = recommendations.find((r) => r.id === spot.id);
          const color = PERSON_COLORS[spot.id];
          const isNear = spot.id === nearPersonId;
          const facingLeft = renderPos.x + PLAYER_SIZE.w / 2 < spot.x;
          return (
            <Fragment key={spot.id}>
              <PersonMarker
                x={spot.x}
                y={spot.y}
                active={isNear}
                firstName={person.firstName}
                country={person.country}
                color={color}
                facingLeft={facingLeft}
              />
              {isNear && (
                <DialogueBubble
                  x={spot.x}
                  y={spot.y}
                  name={person.firstName}
                  company={person.company}
                  country={person.country}
                  quote={person.quote}
                  accent={color}
                  linkedin={person.linkedin}
                />
              )}
            </Fragment>
          );
        })}
        {ZONES.map((zone) => (
          <ZoneBuilding key={zone.id} zone={zone} active={zone.id === nearZoneId} lit={zone.id === "contact" && allFound} />
        ))}
        <PlayerSprite x={renderPos.x} y={renderPos.y} variant={catVariant} walking={isMoving} />
      </div>

      <Hud
        promptLabel={promptLabel}
        fragmentCount={collected.size}
        fragmentTotal={FRAGMENT_SPOTS.length}
        muted={muted}
        onToggleMuted={toggleMuted}
        onOpenJournal={() => setShowJournal(true)}
        onExit={onExit}
      />
      <TouchControls onMove={setTouchVector} onInteract={interact} showInteract={!!promptLabel && !paused} />
      <FragmentToast title={toastTitle} />

      {activeZone && <ZonePanel zone={activeZone} onClose={() => setOpenZoneId(null)} />}
      {showJournal && <JournalPanel collectedIds={collected} onClose={() => setShowJournal(false)} />}
      {openObstacleId && (
        <ObstaclePanel
          obstacleId={openObstacleId}
          resolved={resolvedObstacles.has(openObstacleId)}
          onResolve={() => setResolvedObstacles((prev) => new Set(prev).add(openObstacleId))}
          onClose={() => setOpenObstacleId(null)}
        />
      )}
      {showFinale && (
        <FinalePanel
          onOpenContact={() => {
            setShowFinale(false);
            setOpenZoneId("contact");
          }}
          onClose={() => setShowFinale(false)}
        />
      )}
    </div>
  );
}
