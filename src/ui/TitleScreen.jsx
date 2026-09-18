import { profile } from "../content/profile";

const chipStyle = {
  fontSize: 9,
  color: "#9aa39a",
  border: "2px solid #3a4a3a",
  padding: "5px 12px",
};

export default function TitleScreen({ onStart }) {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden" style={{ background: "#0b0e1a" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(57,255,136,0.05) 0px, rgba(57,255,136,0.05) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(57,255,136,0.05) 0px, rgba(57,255,136,0.05) 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center gap-6 text-center"
        style={{
          background: "#12172a",
          border: "4px solid #39ff88",
          boxShadow: "10px 10px 0 rgba(0,0,0,0.5)",
          maxWidth: 560,
          padding: "48px 56px",
        }}
      >
        <div className="pixel-font" style={{ fontSize: 10, letterSpacing: 2, color: "#9aa39a" }}>
          {profile.role.toUpperCase()}
        </div>

        <div className="pixel-font" style={{ fontSize: 28, lineHeight: 1.7, color: "#39ff88", textShadow: "3px 3px 0 rgba(0,0,0,0.6)" }}>
          GIANCARLO
          <br />
          POÉMAPE
        </div>

        <p className="mono-font" style={{ color: "#cfd6cc", fontSize: 14, lineHeight: 1.7, maxWidth: 420, margin: 0 }}>
          {profile.yearsEngineering} years as a software &amp; data engineer — the last {profile.yearsML} spent building
          production ML systems.
        </p>

        <div className="flex flex-wrap justify-center gap-2" style={{ maxWidth: 420 }}>
          <span className="pixel-font" style={chipStyle}>
            {profile.yearsEngineering} YRS ENGINEERING
          </span>
          <span className="pixel-font" style={chipStyle}>
            {profile.yearsML} YRS ML
          </span>
          <span className="pixel-font" style={chipStyle}>
            M.S. DATA SCIENCE · UTEC &#39;26
          </span>
          <span className="pixel-font" style={chipStyle}>
            {profile.location.toUpperCase()}
          </span>
        </div>

        <button
          onClick={onStart}
          className="pixel-font"
          style={{
            fontSize: 13,
            color: "#39ff88",
            border: "3px solid #39ff88",
            background: "transparent",
            padding: "16px 26px",
            cursor: "pointer",
          }}
        >
          &#9654; PRESS START
        </button>

        <div className="mono-font" style={{ fontSize: 11, letterSpacing: 2, color: "#5c6a5c" }}>
          WASD / ARROWS · TAP TO EXPLORE
        </div>
      </div>
    </div>
  );
}
