import { useState } from "react";
import TitleScreen from "./ui/TitleScreen";
import World from "./game/World";
import { LanguageProvider } from "./i18n/LanguageContext";

const App = () => {
  const [started, setStarted] = useState(false);

  return (
    <LanguageProvider>
      {started ? <World onExit={() => setStarted(false)} /> : <TitleScreen onStart={() => setStarted(true)} />}
    </LanguageProvider>
  );
};

export default App;
