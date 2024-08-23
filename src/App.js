import { useState, useEffect, createContext, useContext } from "react";

import "./styles.css";
import BigTextDisplay from "./BigTextDisplay";
import ColorSampleCircle from "./ColorSampleCircle";
import Footer from "./Footer";
import RandomColors from "./RandomColors";
import Shades from "./Shades";
import Variants from "./Variants";

export const CurrentColorContext = createContext(null);

function App() {
  const [currentColorHex, setCurrentColorHex] = useState("#1E7BF3");

  let [GValue, setGValue] = useState(117);
  let [RValue, setRValue] = useState(["127"]);
  let [BValue, setBValue] = useState(127);

  let [HSLValueArray, setHSLValue] = useState([1, 1, 1]);

  let setNewColor = (newColorHex) => {
    console.log(`${newColorHex} - set New Color Called!`);
  };

  function showNotification(message) {
    // TODO : Set Notification System
    console.log(`Notification: ${message}`);
    // setNotificationMessage(message);
    // setNotificationState("fadeOut");
  }

  return (
    <>
      <div className="appContainer">
        <CurrentColorContext.Provider
          value={{ currentColorHex, setCurrentColorHex }}
        >
          <span className="appTitle" style={{ color: currentColorHex }}>
            color22 <span className="lighter2 smaller"></span>
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

            <Shades
              func={setNewColor}
              currentColorHSLArray={HSLValueArray}
              currentColorHex={currentColorHex}
            />

            <Variants
              currentColorHSLArray={HSLValueArray}
              currentColorHex={currentColorHex}
            />
          </div>

          <div className="RGBSliderContainer">
            <RandomColors />
          </div>
        </CurrentColorContext.Provider>
        <Footer />
      </div>
    </>
  );
}

export default App;
