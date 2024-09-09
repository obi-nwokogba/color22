import { useState, useRef, useEffect, createContext } from "react";

import "./styles.css";
import BigTextDisplay from "./BigTextDisplay";
import ColorSampleCircle from "./ColorSampleCircle";
import Footer from "./Footer";
import RandomColors from "./RandomColors";
import RGBSlider from "./RGBSlider";
import Shades from "./Shades";
import Variants from "./Variants";
import { RGBToHSL, rgbToHex, hexToRgb } from "./Utilities";
import { LeftAnchoredMenu, History } from "../src/components";

export const CurrentColorContext = createContext(null);

function App() {
  const [currentColorHex, setCurrentColorHex] = useState("#1E7BF3");
  const [colorHistory, setColorHistory] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [validColorTyped, setValidColorTyped] = useState(false);

  // Everytime the a new color is picked/clicked and currentColorHex is changed
  useEffect(() => {
    let newRValue = hexToRgb(currentColorHex).r;
    let newGValue = hexToRgb(currentColorHex).g;
    let newBValue = hexToRgb(currentColorHex).b;

    changeRValue(newRValue);
    changeGValue(newGValue);
    changeBValue(newBValue);

    // Old formula:  -355 + (newGValue / 255) * 650;
    let rPositionValue = -355 + Math.floor((newRValue / 255) * 670) + 21;
    let gPositionValue = -355 + Math.floor((newGValue / 255) * 670) + 21;
    let bPositionValue = -355 + Math.floor((newBValue / 255) * 670) + 21;

    setSliderRPosition(rPositionValue);
    setSliderGPosition(gPositionValue);
    setSliderBPosition(bPositionValue);

    setHSLValue(RGBToHSL(newRValue, newGValue, newBValue));

    let currentColorHSLArray = RGBToHSL(newRValue, newGValue, newBValue);
    let currentColorObj = {
      hue: currentColorHSLArray[0],
      sat: currentColorHSLArray[1],
      lig: currentColorHSLArray[2],
      hex: currentColorHex,
    };
    setColorHistory([currentColorObj, ...colorHistory]);
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
  let [sliderGrayPosition, setSliderGrayPosition] = useState(0);

  const changeSliderRPosition = (newValue) => setSliderRPosition(newValue);
  const changeSliderGPosition = (newValue) => setSliderGPosition(newValue);
  const changeSliderBPosition = (newValue) => setSliderBPosition(newValue);

  const changeSliderGrayPosition = (newValue) =>
    setSliderGrayPosition(newValue);

  let [GValue, setGValue] = useState(0);
  let [RValue, setRValue] = useState(0);
  let [BValue, setBValue] = useState(0);
  let [grayValue, setGrayValue] = useState(127);

  let [HSLValueArray, setHSLValue] = useState([1, 1, 1]);

  const changeHexValue = (r, g, b) => setCurrentColorHex(rgbToHex(r, g, b));
  const changeGrayValue = (newValue) => setGrayValue(grayWasPicked(newValue));

  const changeHSLValue = (newHSLArray) =>
    setHSLValue(RGBToHSL(RValue, GValue, BValue));

  let setNewColor = (newColorHex) => {
    //console.log(`${newColorHex} - set New Color Called!`);
  };

  let pull_data = (colorComponent, data, hasBeenReleased) => {
    if (colorComponent === "R") {
      changeRValue(data);
      let newXPosition = -355 + Math.floor((data / 255) * 670) + 21;
      if (hasBeenReleased) {
        changeSliderRPosition(newXPosition);
      }
    }

    if (colorComponent === "G") {
      changeGValue(data);
      let newXPosition = -355 + Math.floor((data / 255) * 670) + 21;
      if (hasBeenReleased) {
        changeSliderGPosition(newXPosition);
      }
    }

    if (colorComponent === "B") {
      changeBValue(Number(data));
      let newXPosition = -355 + Math.floor((data / 255) * 670) + 21;
      if (hasBeenReleased) {
        changeSliderBPosition(newXPosition);
      }
    }

    if (colorComponent === "GRAY") {
      changeGrayValue(data);
      let newXPosition = -355 + Math.floor((data / 255) * 670) + 21;
      if (hasBeenReleased) {
        changeSliderGrayPosition(newXPosition);
      }
    }

    changeHexValue(RValue, GValue, BValue);
    changeHSLValue([(RValue, GValue, BValue)]);
  };

  function grayWasPicked(newValue) {
    setRValue(newValue);
    setGValue(newValue);
    setBValue(newValue);

    // setSliderRPosition(rightPosition);
    // setSliderGPosition(rightPosition);
    // setSliderBPosition(rightPosition);

    changeHexValue(RValue, GValue, BValue);
    changeHSLValue([(RValue, GValue, BValue)]);
    return newValue;
  }

  function showNotification(message) {
    console.log(`Notification to be shown: ${message}`);
  }

  function validateSearchedColor(e) {
    console.log(e);
    if (String(e.target.value).length > 7) {
      e.target.value = String(e.target.value).slice(0, 7);
    }
    let currentTypedInValue = e.target.value.toString();

    let hexcolorregex = /^#([0-9a-f]{3}){1,2}$/i;
    let validColorTyped = false;

    // Accept colors with or without #
    if (hexcolorregex.test(currentTypedInValue)) {
      validColorTyped = true;
    } else if (hexcolorregex.test(`#${currentTypedInValue}`)) {
      validColorTyped = true;
      currentTypedInValue = "#" + currentTypedInValue;
    }
    setSearchVal(currentTypedInValue);
    setValidColorTyped(validColorTyped);
  }

  function searchForColor() {
    if (validColorTyped) {
      console.log(`Valid color typed and searched for!!`);
      setCurrentColorHex(searchVal);
    } else {
      // TODO: Notify that this isn't a valid HTML Hex Code
    }
  }

  return (
    <>
      <div className="app-frame">
        <LeftAnchoredMenu />

        <div className="logo-search-header">
          <img
            className="color22HeaderLogo"
            src="/color22_logo_picker.svg"
            alt="color22"
          />

          <div className="search-container">
            <div className="search-sub-container">
              <input
                defaultValue={currentColorHex}
                onChange={validateSearchedColor}
                className="search-input-box"
                onInput={validateSearchedColor}
              />
              <span>VALID COLOR</span> <span>INVALID</span>
            </div>
            <img
              src="../search-icon.svg"
              alt="Search"
              className="search-icon-button"
              onClick={searchForColor}
            />
          </div>
        </div>
        <div className="appContainer">
          <CurrentColorContext.Provider
            value={{ currentColorHex, setCurrentColorHex }}
          >
            <span className="colorHistoryText">
              HISTORY
              <span className="lighter2 smaller">{colorHistory.length}</span>
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
              <History
                func={setNewColor}
                historyHexArray={colorHistory}
                currentColorHSLArray={HSLValueArray}
                currentColorHex={currentColorHex}
              />
            </div>

            <div className="RGBSliderContainer">
              <RandomColors />
            </div>
          </CurrentColorContext.Provider>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
