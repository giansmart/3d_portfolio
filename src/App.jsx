import { useState } from "react";
import TitleScreen from "./ui/TitleScreen";
import World from "./game/World";

const App = () => {
  const [started, setStarted] = useState(false);

  return started ? <World onExit={() => setStarted(false)} /> : <TitleScreen onStart={() => setStarted(true)} />;
};

export default App;
