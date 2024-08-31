import ShadeCell from "./ShadeCell";
import "./styles.css";

export default function Shades(props, hslToHexFunction) {
  let currentColorHue = Number(props.currentColorHSLArray[0]);
  let currentColorSat = Number(props.currentColorHSLArray[1]);
  let currentColorLig = Number(props.currentColorHSLArray[2]);

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let hueArray = [];
  let saturationArray = [];
  let lightnessArray = [];

  for (let i = 1; i < 9; i++) {
    let newHue = currentColorHue + randomInteger(-20, 20);
    let newSaturation = currentColorSat + randomInteger(-6, 6);
    let newLightness = currentColorLig + randomInteger(-6, 6);

    if (newHue > 360) {
      newHue = 360;
    }
    if (newHue < 0) {
      newHue = 0;
    }
    if (newSaturation > 100) {
      newSaturation = 100;
    }
    if (newSaturation < 0) {
      newSaturation = 0;
    }
    if (newLightness > 100) {
      newLightness = 100;
    }
    if (newLightness < 0) {
      newLightness = 0;
    }

    hueArray.push(Number(newHue));
    saturationArray.push(Number(newSaturation));
    lightnessArray.push(Number(newLightness));
  }

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

  return (
    <>
      <div className="palette-header-container">
        <div className="palette-header-text">VARIANTS</div>
        <div></div>
      </div>
      <div className="shadesContainer">
        <ShadeCell
          hue={hueArray[0]}
          sat={saturationArray[0]}
          lig={lightnessArray[0]}
          hex={hslToHex(hueArray[0], saturationArray[0], lightnessArray[0])}
        />
        <ShadeCell
          hue={hueArray[1]}
          sat={saturationArray[1]}
          lig={lightnessArray[1]}
          hex={hslToHex(hueArray[1], saturationArray[1], lightnessArray[1])}
        />
        <ShadeCell
          hue={hueArray[2]}
          sat={saturationArray[2]}
          lig={lightnessArray[2]}
          hex={hslToHex(hueArray[2], saturationArray[2], lightnessArray[2])}
        />
        <ShadeCell
          hue={hueArray[3]}
          sat={saturationArray[3]}
          lig={lightnessArray[3]}
          hex={hslToHex(hueArray[3], saturationArray[3], lightnessArray[3])}
        />
        <ShadeCell
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig}
          hex={hslToHex(currentColorHue, currentColorSat, currentColorLig)}
          thisIsCurrentColor={true}
        />
        <ShadeCell
          hue={hueArray[4]}
          sat={saturationArray[4]}
          lig={lightnessArray[4]}
          hex={hslToHex(hueArray[4], saturationArray[4], lightnessArray[4])}
        />
        <ShadeCell
          hue={hueArray[5]}
          sat={saturationArray[5]}
          lig={lightnessArray[5]}
          hex={hslToHex(hueArray[5], saturationArray[5], lightnessArray[5])}
        />
        <ShadeCell
          hue={hueArray[6]}
          sat={saturationArray[6]}
          lig={lightnessArray[6]}
          hex={hslToHex(hueArray[6], saturationArray[6], lightnessArray[6])}
        />
        <ShadeCell
          hue={hueArray[7]}
          sat={saturationArray[7]}
          lig={lightnessArray[7]}
          hex={hslToHex(hueArray[7], saturationArray[7], lightnessArray[7])}
        />
      </div>
    </>
  );
}
