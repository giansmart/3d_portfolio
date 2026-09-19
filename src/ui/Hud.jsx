import { useLanguage } from "../i18n/LanguageContext";

export default function Hud({ promptLabel, fragmentCount, fragmentTotal, muted, onToggleMuted, onOpenJournal, onExit }) {
  const { dict, lang, toggleLang } = useLanguage();

  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center justify-between gap-2 px-2 sm:px-6 z-20"
      style={{
        minHeight: 48,
        paddingTop: "env(safe-area-inset-top)",
        background: "rgba(11,14,26,0.85)",
        borderBottom: "2px solid #39ff88",
      }}
    >
      <div className="min-w-0 flex-1">
        {promptLabel && (
          <div className="pixel-font animate-pulse truncate" style={{ fontSize: 10, color: "#ffb84d" }} aria-live="polite">
            <span>{dict.hud.pressE}</span>
            <span className="hidden sm:inline"> {promptLabel}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-4 shrink-0">
        <button
          onClick={toggleLang}
          aria-label="Toggle language"
          className="pixel-font"
          style={{
            fontSize: 9,
            color: "#9aa39a",
            background: "none",
            border: "2px solid #3a4a3a",
            padding: "8px 6px",
            minHeight: 36,
            cursor: "pointer",
          }}
        >
          {lang.toUpperCase()}
          <span className="hidden sm:inline"> &#8594; {dict.lang.switchTo}</span>
        </button>
        <button
          onClick={onToggleMuted}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
          aria-pressed={muted}
          className="pixel-font"
          style={{
            fontSize: 9,
            color: muted ? "#5c6a5c" : "#39ff88",
            background: "none",
            border: `2px solid ${muted ? "#3a4a3a" : "#39ff88"}`,
            padding: "8px 6px",
            minHeight: 36,
            cursor: "pointer",
          }}
        >
          &#9834;
          <span className="hidden sm:inline"> {muted ? dict.hud.soundOff : dict.hud.soundOn}</span>
        </button>
        <button
          onClick={onOpenJournal}
          className="pixel-font"
          style={{
            fontSize: 9,
            color: "#ffb84d",
            background: "none",
            border: "2px solid #ffb84d",
            padding: "8px 6px",
            minHeight: 36,
            cursor: "pointer",
          }}
        >
          &#9670; {fragmentCount}/{fragmentTotal}
        </button>
        <button
          onClick={onExit}
          aria-label={dict.hud.exit}
          className="pixel-font"
          style={{ fontSize: 9, color: "#9aa39a", background: "none", border: "none", padding: "8px 4px", minHeight: 36, cursor: "pointer" }}
        >
          &#10005;
          <span className="hidden sm:inline"> {dict.hud.exit}</span>
        </button>
      </div>
    </div>
  );
}
