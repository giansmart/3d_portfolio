import { useState } from "react";
import TitleScreen from "./ui/TitleScreen";
import World from "./game/World";
import ResumeView from "./ui/ResumeView";
import { LanguageProvider } from "./i18n/LanguageContext";

// No router in this project — a single query param is enough to make the CV
// view linkable/bookmarkable without adding a routing dependency, and it
// works on any static host (no server-side rewrite rules needed).
function initialView() {
  return new URLSearchParams(window.location.search).get("view") === "resume" ? "resume" : "title";
}

const App = () => {
  const [view, setView] = useState(initialView);

  const goGame = () => {
    setView("game");
    window.history.replaceState({}, "", window.location.pathname);
  };
  const goResume = () => {
    setView("resume");
    window.history.replaceState({}, "", `${window.location.pathname}?view=resume`);
  };
  const goTitle = () => {
    setView("title");
    window.history.replaceState({}, "", window.location.pathname);
  };

  return (
    <LanguageProvider>
      {view === "game" && <World onExit={goTitle} />}
      {view === "resume" && <ResumeView onPlay={goGame} />}
      {view === "title" && <TitleScreen onStart={goGame} onViewResume={goResume} />}
    </LanguageProvider>
  );
};

export default App;
