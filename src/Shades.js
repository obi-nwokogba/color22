import { useState, useEffect } from 'react';
import { Switch } from 'antd';
import ShadeCell from "./ShadeCell";
import "./styles.css";

export default function Shades(props, hslToHexFunction) {

  const [numberOfShades, setNumberOfShades] = useState(8);
  const [stringOfShadesForClipboard, setStringOfShadesForClipboard] = useState('');

  let currentColorHue = props.currentColorHSLArray[0];
  let currentColorSat = props.currentColorHSLArray[1];
  let currentColorLig = Number(props.currentColorHSLArray[2]);

  let maxLightness = 100 - currentColorLig;
  let maxDarkness = currentColorLig;

  const [lightnessIncrement, setLightnessIncrement] = useState(maxLightness / (numberOfShades / 2));
  const [darknessIncrement, setDarknessIncrement] = useState(maxDarkness / (numberOfShades / 2));

  useEffect(() => {
    generateArrayOfShades();
    setLightnessIncrement(Math.ceil((100 - props.currentColorHSLArray[2]) / (numberOfShades / 2)));
    setDarknessIncrement(Math.ceil((props.currentColorHSLArray[2]) / (numberOfShades / 2)));
    setStringOfShadesForClipboard(JSON.stringify(arrayOfHexColors.map(colorObj => colorObj.hex)));
  }, [numberOfShades, generateArrayOfShades,
    setLightnessIncrement, setDarknessIncrement,
    maxDarkness, maxLightness,
    setStringOfShadesForClipboard]);

  let arrayOfHexColors = [];

  // hsl to hex function from:
  // https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
  function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }


  function generateArrayOfShades() {

    let totalNumberOfCellsAdded = 0;
    let numberOfDarkShadesToMake = Math.floor(numberOfShades / 2);

    // Create dark shades, starting from the darkest
    for (let d = numberOfDarkShadesToMake; d > 0; d--) {
      let lightnessValue = currentColorLig - darknessIncrement * d;

      if (lightnessValue >= 0) {
        arrayOfHexColors.push({
          hex:
            hslToHex(
              currentColorHue,
              currentColorSat,
              lightnessValue),
          lightness: lightnessValue
        });
        totalNumberOfCellsAdded++;
      }

    }

    // Push the original current color as middle element of array
    let lightnessValue = currentColorLig;
    arrayOfHexColors.push({
      hex:
        hslToHex(
          currentColorHue,
          currentColorSat,
          lightnessValue),
      lightness: lightnessValue
    });
    totalNumberOfCellsAdded++;


    // Push set of lighter shades into array.
    let l = 1;
    while (totalNumberOfCellsAdded < numberOfShades) {
      let lightnessValue = currentColorLig + lightnessIncrement * l;


      if (lightnessValue <= 100.0001) {
        arrayOfHexColors.push({
          hex:
            hslToHex(
              currentColorHue,
              currentColorSat,
              lightnessValue),
          lightness: lightnessValue
        });
      }

      totalNumberOfCellsAdded++;
      l++;
    }
  }

  generateArrayOfShades();

  let arrayOfShadeCells = arrayOfHexColors.map(shadeObject => {
    return (
      <ShadeCell
        thisIsCurrentColor={shadeObject.hex === props.currentColorHex}
        func={props.func}
        hue={currentColorHue}
        sat={currentColorSat}
        lig={shadeObject.lightness}
        hex={shadeObject.hex}
      />);
  });

  return (
    <>
      <div className="palette-header-container">
        <div className="palette-header-text"> SHADES
          <span className="lighter">
            &nbsp;&middot; DARKER: -{darknessIncrement.toFixed(1)}% &nbsp;&middot;
            LIGHTER: +{lightnessIncrement.toFixed(1)}%
          </span></div>
        <div></div>
        <div>

          <button className="button1" onClick={() => {
            navigator.clipboard.writeText(stringOfShadesForClipboard);
          }}>copy all
          </button> &nbsp;
          <Switch checkedChildren="18" unCheckedChildren="9"
            onChange={event => {
              event ? setNumberOfShades(18) : setNumberOfShades(9);
            }} />
        </div>
      </div>

      <div className="shadesContainer">
        {arrayOfShadeCells}
      </div>
    </>
  );
}
