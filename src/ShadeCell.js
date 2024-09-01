import { useContext } from "react";
import { CurrentColorContext } from "./App.js";
import "./styles.css";

// CurrentColorContext = createContext(null)

export default function ShadeCell(props) {
  let { currentColorHex, setCurrentColorHex } =
    useContext(CurrentColorContext) ?? {};

  return (
    <div className="shadeCellContainer">
      <div
        onClick={() => {
          setCurrentColorHex(props.hex);
        }}
        onMouseEnter={() => {
          // document.body.classList.add("background-red");
        }}
        className="shadeCell"
        style={{
          backgroundColor: `hsl(${props.hue},
              ${props.sat}%,
              ${props.lig}%)`,
        }}
      >
        <div
          className="currentColorMarker"
          style={{
            backgroundColor: `${props.thisIsCurrentColor ? `#FFFFFF` : `transparent`
              }`,
          }}
        >
          {" "}
        </div>
      </div>
      <span className="shadeCellLabel">
        {
          //(props.lig).toFixed(2)
          props.hex
        }
      </span>
      <span
        className="shadeCellCopyButton"
        onClick={() => {
          navigator.clipboard.writeText(props.hex);
        }}
      >
        COPY
        <img
          onClick={() => {
            navigator.clipboard.writeText(props.hex);
          }}
          src="/copyIcon.svg"
          alt="Copy to Clipboard"
          className="shadeCellCopyIcon"
        />
      </span>
    </div>
  );
}
