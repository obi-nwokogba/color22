import { useState, useEffect, createContext, useContext } from "react";

import "./styles.css";
import BigTextDisplay from "./BigTextDisplay";
import ColorSampleCircle from "./ColorSampleCircle";
import Footer from "./Footer";
import RandomColors from "./RandomColors";
import RGBSlider from "./RGBSlider";
import Shades from "./Shades";
import Variants from "./Variants";

export const CurrentColorContext = createContext(null);

function App() {
  const [currentColorHex, setCurrentColorHex] = useState("#1E7BF3");

  // Everytime the a new color is picked/clicked
  useEffect(() => {
    let newRValue = hexToRgb(currentColorHex).r;
    let newGValue = hexToRgb(currentColorHex).g;
    let newBValue = hexToRgb(currentColorHex).b;

    changeRValue(newRValue);
    changeGValue(newGValue);
    changeBValue(newBValue);

    setSliderRPosition(newRValue);
    setSliderGPosition(newGValue);
    setSliderBPosition(newBValue);

    setHSLValue(RGBToHSL(newRValue, newGValue, newBValue));

    // Scroll to top of page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentColorHex]);

  // ------ END OF MAIN useEffect. Start of state changes ------------------------

  const changeRValue = (newValue) => setRValue(newValue);
  const changeGValue = (newValue) => setGValue(newValue);
  const changeBValue = (newValue) => setBValue(newValue);

  let [sliderRPosition, setSliderRPosition] = useState(31);
  let [sliderGPosition, setSliderGPosition] = useState(123);
  let [sliderBPosition, setSliderBPosition] = useState(242);
  let [sliderGrayPosition, setSliderGrayPosition] = useState(-89);

  const changeSliderRPosition = (newValue) => setSliderRPosition(newValue);
  const changeSliderGPosition = (newValue) => setSliderGPosition(newValue);
  const changeSliderBPosition = (newValue) => setSliderBPosition(newValue);

  const changeSliderGrayPosition = (newValue) =>
    setSliderGrayPosition(newValue);

  let [GValue, setGValue] = useState(117);
  let [RValue, setRValue] = useState(["127"]);
  let [BValue, setBValue] = useState(127);

  let [HSLValueArray, setHSLValue] = useState([1, 1, 1]);

  let [grayValue, setGrayValue] = useState(127);

  const changeHexValue = (r, g, b) => setCurrentColorHex(rgbToHex(r, g, b));
  const changeGrayValue = (newValue) => setGrayValue(grayWasPicked(newValue));

  const changeHSLValue = (newHSLArray) =>
    setHSLValue(RGBToHSL(RValue, GValue, BValue));

  let setNewColor = (newColorHex) => {
    console.log(`${newColorHex} - set New Color Called!`);
  };

  let pull_data = (colorComponent, data) => {
    console.log(colorComponent);
    console.log(JSON.stringify(data));

    if (colorComponent === "R") {
      changeRValue(Number(data));
      // let newXPosition = (45 + ((Number(data) - 145) * 640) / 245) * 1.000001;
      let trueValue = Math.floor(((data.x + 335) / 670) * 255);
      let newXPosition = trueValue;
      changeSliderRPosition(newXPosition);
    }

    if (colorComponent === "G") {
      changeGValue(Number(data));
      let newXPosition = (45 + ((Number(data) - 145) * 640) / 245) * 1.000001;
      changeSliderGPosition(newXPosition);
    }

    if (colorComponent === "B") {
      changeBValue(Number(data));
      let newXPosition = (50 + ((Number(data) - 145) * 640) / 245) * 1.000001;
      changeSliderBPosition(newXPosition);
    }
    if (colorComponent === "GRAY") {
      changeGrayValue(Number(data));
      let newXPosition = (50 + ((Number(data) - 145) * 640) / 245) * 1.000001;
      changeSliderGrayPosition(newXPosition);
    }

    changeHexValue(RValue, GValue, BValue);
    changeHSLValue([(RValue, GValue, BValue)]);
  };

  // FUNCTIONS=================================

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    let hexColor =
      "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    return hexColor.toUpperCase();
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  // RGB to HSL function is from
  // https://www.30secondsofcode.org/js/s/rgb-to-hsl/
  function RGBToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      (60 * h < 0 ? 60 * h + 360 : 60 * h).toFixed(2),
      (
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
      ).toFixed(2),
      ((100 * (2 * l - s)) / 2).toFixed(2),
    ];
  }

  function grayWasPicked(newValue) {
    setRValue(newValue);
    setGValue(newValue);
    setBValue(newValue);

    let rightPosition = 45 + ((Number(newValue) - 145) * 645) / 245;

    setSliderRPosition(rightPosition);
    setSliderGPosition(rightPosition);
    setSliderBPosition(rightPosition);

    changeHexValue(RValue, GValue, BValue);
    changeHSLValue([(RValue, GValue, BValue)]);
    return newValue;
  }

  function showNotification(message) {
    // alert();
    console.log(`hi there`);
    // setNotificationMessage(message);
    // setNotificationState("fadeOut");
  }

  // TODO: CURRENT : WORK IN PROGRESS

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
          </div>

          <div className="RGBSliderContainer">
            <RGBSlider
              func={("R", pull_data)}
              colorComponent={"R"}
              sliderXPosition={Number(sliderRPosition)}
            />
            <RGBSlider
              func={("G", pull_data)}
              colorComponent={"G"}
              sliderXPosition={sliderGPosition}
            />
            <RGBSlider
              func={("B", pull_data)}
              colorComponent={"B"}
              sliderXPosition={sliderBPosition}
            />

            <h3>
              GRAY{" "}
              <span className="lighter">
                BRIGHTNESS: {((grayValue / 255) * 100).toFixed(2)}%
              </span>
            </h3>

            <RGBSlider
              func={("GRAY", pull_data)}
              colorComponent={"GRAY"}
              sliderXPosition={sliderGrayPosition}
            />

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
