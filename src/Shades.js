import ShadeCell from "./ShadeCell";
import "./styles.css";

export default function Shades(props, hslToHexFunction) {
  let currentColorHue = props.currentColorHSLArray[0];
  let currentColorSat = props.currentColorHSLArray[1];
  let currentColorLig = Number(props.currentColorHSLArray[2]);

  let maxLightness = 100 - currentColorLig;
  let maxDarkness = currentColorLig;

  let lightnessIncrement = maxLightness / 4.6;
  let darknessIncrement = maxDarkness / 4.6;

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
      <h3 className="swatchHeader">
        SHADES
        <span className="lighter">
          &nbsp;&middot; DARKER: -{darknessIncrement.toFixed(1)}% &nbsp;&middot;
          LIGHTER: +{lightnessIncrement.toFixed(1)}%
        </span>
      </h3>
      <div className="shadesContainer">
        <ShadeCell
          func={props.func}
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig - darknessIncrement * 4}
          hex={hslToHex(
            currentColorHue,
            currentColorSat,
            currentColorLig - darknessIncrement * 4
          )}
        />

        <ShadeCell
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig - darknessIncrement * 3}
          hex={hslToHex(
            currentColorHue,
            currentColorSat,
            currentColorLig - darknessIncrement * 3
          )}
        />

        <ShadeCell
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig - darknessIncrement * 2}
          hex={hslToHex(
            currentColorHue,
            currentColorSat,
            currentColorLig - darknessIncrement * 2
          )}
        />

        <ShadeCell
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig - darknessIncrement}
          hex={hslToHex(
            currentColorHue,
            currentColorSat,
            currentColorLig - darknessIncrement
          )}
        />

        <ShadeCell
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig}
          hex={hslToHex(currentColorHue, currentColorSat, currentColorLig)}
          thisIsCurrentColor={true}
        />

        <ShadeCell
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig + lightnessIncrement}
          hex={hslToHex(
            currentColorHue,
            currentColorSat,
            currentColorLig + lightnessIncrement
          )}
        />

        <ShadeCell
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig + lightnessIncrement * 2}
          hex={hslToHex(
            currentColorHue,
            currentColorSat,
            currentColorLig + lightnessIncrement * 2
          )}
        />

        <ShadeCell
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig + lightnessIncrement * 3}
          hex={hslToHex(
            currentColorHue,
            currentColorSat,
            currentColorLig + lightnessIncrement * 3
          )}
        />

        <ShadeCell
          hue={currentColorHue}
          sat={currentColorSat}
          lig={currentColorLig + lightnessIncrement * 4}
          hex={hslToHex(
            currentColorHue,
            currentColorSat,
            currentColorLig + lightnessIncrement * 4
          )}
        />
      </div>
    </>
  );
}
