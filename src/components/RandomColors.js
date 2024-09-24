import ShadeCell from "../ShadeCell";
import "../styles.css";

export default function RandomColors() {
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let hueArray = [];
  let saturationArray = [];
  let lightnessArray = [];

  for (let i = 1; i < 19; i++) {
    let newHue = randomInteger(0, 360);

    // Bias towards more saturated colors
    let newSaturation = randomInteger(40, 100);
    let newLightness = randomInteger(20, 98);

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
        <div className="palette-header-text">RANDOM COLORS</div>
        <div>
          {" "}
          <button className="button1">create more colors</button>
        </div>
      </div>

      {/* First Row of Random Colors */}
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
        <ShadeCell
          hue={hueArray[8]}
          sat={saturationArray[8]}
          lig={lightnessArray[8]}
          hex={hslToHex(hueArray[8], saturationArray[8], lightnessArray[8])}
        />
      </div>

      {/* SECOND ROW of Random Colors */}
      <div className="shadesContainer">
        <ShadeCell
          hue={hueArray[9]}
          sat={saturationArray[9]}
          lig={lightnessArray[9]}
          hex={hslToHex(hueArray[9], saturationArray[9], lightnessArray[9])}
        />
        <ShadeCell
          hue={hueArray[10]}
          sat={saturationArray[10]}
          lig={lightnessArray[10]}
          hex={hslToHex(hueArray[10], saturationArray[10], lightnessArray[10])}
        />
        <ShadeCell
          hue={hueArray[11]}
          sat={saturationArray[11]}
          lig={lightnessArray[11]}
          hex={hslToHex(hueArray[11], saturationArray[11], lightnessArray[11])}
        />
        <ShadeCell
          hue={hueArray[12]}
          sat={saturationArray[12]}
          lig={lightnessArray[12]}
          hex={hslToHex(hueArray[12], saturationArray[12], lightnessArray[12])}
        />
        <ShadeCell
          hue={hueArray[13]}
          sat={saturationArray[13]}
          lig={lightnessArray[13]}
          hex={hslToHex(hueArray[13], saturationArray[13], lightnessArray[13])}
        />
        <ShadeCell
          hue={hueArray[14]}
          sat={saturationArray[14]}
          lig={lightnessArray[14]}
          hex={hslToHex(hueArray[14], saturationArray[14], lightnessArray[14])}
        />
        <ShadeCell
          hue={hueArray[15]}
          sat={saturationArray[15]}
          lig={lightnessArray[15]}
          hex={hslToHex(hueArray[15], saturationArray[15], lightnessArray[15])}
        />
        <ShadeCell
          hue={hueArray[16]}
          sat={saturationArray[16]}
          lig={lightnessArray[16]}
          hex={hslToHex(hueArray[16], saturationArray[16], lightnessArray[16])}
        />
        <ShadeCell
          hue={hueArray[17]}
          sat={saturationArray[17]}
          lig={lightnessArray[17]}
          hex={hslToHex(hueArray[17], saturationArray[17], lightnessArray[17])}
        />
      </div>
    </>
  );
}
