import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SwitchButton from "./components/button/SwitchButton";

function App() {
  const [value, setValue] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("light");
  return (
    <div className="App">
      <SwitchButton mode={mode} value={value} onChange={setValue} size={600} />
      <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        {mode}
      </button>
    </div>
  );
}

export default App;
