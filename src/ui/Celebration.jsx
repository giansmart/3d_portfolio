import { useMemo } from "react";

// Confetti + fireworks for the "you beat the game" moment when FinalePanel
// opens. Plain CSS keyframes (see index.css), no canvas/animation library —
// same constraint as the rest of the game. Pointer-events are disabled so it
// never blocks the modal's buttons underneath.
const COLORS = ["#39ff88", "#ffb84d", "#ff6b9d", "#5ec8e0", "#eef1e8"];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function buildConfetti(count) {
  return Array.from({ length: count }, (_, i) => {
    const isStreamer = Math.random() < 0.35;
    return {
      id: i,
      left: randomBetween(0, 100),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      width: isStreamer ? 4 : randomBetween(5, 10),
      height: isStreamer ? randomBetween(22, 34) : randomBetween(10, 16),
      duration: randomBetween(2.4, 4),
      delay: randomBetween(0, 1.3),
      drift: randomBetween(-90, 90),
    };
  });
}

function buildFireworks(count) {
  return Array.from({ length: count }, (_, i) => {
    const particleCount = 14;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const particles = Array.from({ length: particleCount }, (_, p) => {
      const angle = (p / particleCount) * Math.PI * 2 + randomBetween(-0.15, 0.15);
      const radius = randomBetween(55, 95);
      return {
        id: p,
        dx: Math.cos(angle) * radius,
        dy: Math.sin(angle) * radius,
        color: Math.random() < 0.7 ? color : COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });
    return {
      id: i,
      x: randomBetween(14, 86),
      y: randomBetween(10, 42),
      delay: i * 0.35 + randomBetween(0, 0.15),
      color,
      particles,
    };
  });
}

export default function Celebration() {
  const confetti = useMemo(() => buildConfetti(50), []);
  const fireworks = useMemo(() => buildFireworks(4), []);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden" style={{ pointerEvents: "none" }} aria-hidden="true">
      {confetti.map((c) => (
        <span
          key={c.id}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            width: c.width,
            height: c.height,
            background: c.color,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            "--drift": `${c.drift}px`,
          }}
        />
      ))}
      {fireworks.map((f) => (
        <div key={f.id} className="absolute" style={{ left: `${f.x}%`, top: `${f.y}%` }}>
          <span
            className="firework-flash"
            style={{ background: f.color, boxShadow: `0 0 16px 6px ${f.color}`, animationDelay: `${f.delay}s` }}
          />
          {f.particles.map((p) => (
            <span
              key={p.id}
              className="firework-particle"
              style={{
                background: p.color,
                boxShadow: `0 0 6px 1px ${p.color}`,
                animationDelay: `${f.delay}s`,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
