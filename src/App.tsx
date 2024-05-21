import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Menu from "./components/Menu";
import Toolbox from "./components/Toolbox";
import Board from "./components/Board";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="">
        <Menu />
        <Toolbox />
        <Board />
      </div>
    </>
  );
}

export default App;
