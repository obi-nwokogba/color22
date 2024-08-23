import { useState, useEffect, createContext, useContext } from "react";

import "./styles.css";
import BigTextDisplay from "./BigTextDisplay";
import ColorSampleCircle from "./ColorSampleCircle";
import Footer from "./Footer";

function App() {
  const [currentColorHex, setCurrentColorHex] = useState("#1E7BF3");

  let [GValue, setGValue] = useState(117);
  let [RValue, setRValue] = useState(["127"]);
  let [BValue, setBValue] = useState(127);

  let [HSLValueArray, setHSLValue] = useState([1, 1, 1]);

  function showNotification(message) {
    // TODO : Set Notification System
    console.log(`Notification: ${message}`);
    // setNotificationMessage(message);
    // setNotificationState("fadeOut");
  }

  return (
    <>
      <div className="appContainer">
        <span className="appTitle" style={{ color: currentColorHex }}>
          coloressa 2 <span className="lighter2 smaller"></span>
        </span>

        <div className="displayColorContainer">
          <ColorSampleCircle
            currentColorHex={currentColorHex}
            onClick={() => {
              showNotification("Copied to Cluppy");
            }}
          />

          <div className="colorDetailsColumn">
            <BigTextDisplay currentColorHex={currentColorHex} />
            <BigTextDisplay
              currentColorHex={`rgb(${RValue}, ${GValue}, ${BValue})`}
            />
            <BigTextDisplay
              currentColorHex={`hsl(${HSLValueArray[0]}, ${HSLValueArray[1]}%, ${HSLValueArray[2]}%)`}
            />
          </div>
        </div>

        <div className="RGBSliderContainer"></div>

        <Footer />
      </div>
    </>
  );
}

export default App;
