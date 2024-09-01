import { useState, useEffect } from 'react';
import { Switch } from 'antd';
import ShadeCell from "./ShadeCell";
import "./styles.css";

export default function Shades(props, hslToHexFunction) {

  const [numberOfShades, setNumberOfShades] = useState(8);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    generateArrayOfShades();
  }, [numberOfShades, generateArrayOfShades]);

  let currentColorHue = props.currentColorHSLArray[0];
  let currentColorSat = props.currentColorHSLArray[1];
  let currentColorLig = Number(props.currentColorHSLArray[2]);

  let maxLightness = 100 - currentColorLig;
  let maxDarkness = currentColorLig;

  let lightnessIncrement = maxLightness / 4.6;
  let darknessIncrement = maxDarkness / 4.6;

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

    let numberOfDarkShadesToMake = Math.floor(numberOfShades / 2);

    // Create dark shades, starting from the darkest
    for (let d = numberOfDarkShadesToMake; d > 0; d--) {
      let lightnessValue = currentColorLig - darknessIncrement * d;
      arrayOfHexColors.push({
        hex:
          hslToHex(
            currentColorHue,
            currentColorSat,
            lightnessValue),
        lightness: lightnessValue
      });
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


    // Push set of lighter shades into array.
    for (let l = 1; l < numberOfDarkShadesToMake; l++) {
      let lightnessValue = currentColorLig + lightnessIncrement * l;
      arrayOfHexColors.push({
        hex:
          hslToHex(
            currentColorHue,
            currentColorSat,
            lightnessValue),
        lightness: lightnessValue
      });
    }
  }

  generateArrayOfShades();

  let arrayOfShadeCells = arrayOfHexColors.map(shadeObject => {
    return (
      <ShadeCell
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
        <div><Switch checkedChildren="18" unCheckedChildren="9"
          onChange={event => {
            event ? setNumberOfShades(18) : setNumberOfShades(9);
            console.log(numberOfShades);
          }} /> {numberOfShades}</div>
        <div>

          <button className="button1" onClick={() => {
            navigator.clipboard.writeText(arrayOfHexColors);
          }}>copy all
          </button>
        </div>
      </div>

      <div className="shadesContainer">
        {arrayOfShadeCells}
      </div>
    </>
  );
}
