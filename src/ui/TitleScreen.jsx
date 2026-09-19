import { profile } from "../content/profile";
import { useLanguage, pickLang } from "../i18n/LanguageContext";

const chipStyle = {
  fontSize: 9,
  color: "#9aa39a",
  border: "2px solid #3a4a3a",
  padding: "5px 12px",
};

export default function TitleScreen({ onStart }) {
  const { dict, lang, toggleLang } = useLanguage();
  const { role } = pickLang(profile, lang);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden" style={{ background: "#0b0e1a" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(57,255,136,0.05) 0px, rgba(57,255,136,0.05) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(57,255,136,0.05) 0px, rgba(57,255,136,0.05) 1px, transparent 1px, transparent 40px)",
        }}
      />

      <button
        onClick={toggleLang}
        aria-label="Toggle language"
        className="pixel-font"
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          zIndex: 20,
          fontSize: 11,
          color: "#39ff88",
          background: "#12172a",
          border: "2px solid #39ff88",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        {lang.toUpperCase()} &#8594; {dict.lang.switchTo}
      </button>

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
          {role.toUpperCase()}
        </div>

        <div className="pixel-font" style={{ fontSize: 28, lineHeight: 1.7, color: "#39ff88", textShadow: "3px 3px 0 rgba(0,0,0,0.6)" }}>
          GIANCARLO
          <br />
          POÉMAPE
        </div>

        <p className="mono-font" style={{ color: "#cfd6cc", fontSize: 14, lineHeight: 1.7, maxWidth: 420, margin: 0 }}>
          {dict.title.invite}
        </p>

        <div className="flex flex-wrap justify-center gap-2" style={{ maxWidth: 420 }}>
          <span className="pixel-font" style={chipStyle}>
            {profile.yearsEngineering} {dict.title.badgeEngineering}
          </span>
          <span className="pixel-font" style={chipStyle}>
            {profile.yearsML} {dict.title.badgeMl}
          </span>
          <a href={profile.utecUrl} target="_blank" rel="noreferrer" className="pixel-font" style={{ ...chipStyle, textDecoration: "none" }}>
            {dict.title.badgeMasters}
          </a>
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
          &#9654; {dict.title.start}
        </button>

        <div className="mono-font" style={{ fontSize: 11, letterSpacing: 2, color: "#5c6a5c" }}>
          {dict.title.hint}
        </div>
      </div>
    </div>
  );
}
