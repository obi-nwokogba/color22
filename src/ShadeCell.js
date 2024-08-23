import { useState, createContext, useContext } from "react";
import { CurrentColorContext } from "./App.js";
import "./styles.css";
import Shades from "./Shades";

// CurrentColorContext = createContext(null)

export default function ShadeCell(props) {
  let { currentColorHex, setCurrentColorHex } =
    useContext(CurrentColorContext) ?? {};

  function setNewColor(newColorHex) {
    const theme = useContext(CurrentColorContext);
  }

  return (
    <div className="shadeCellContainer">
      <div
        onClick={() => {
          setCurrentColorHex(props.hex);
        }}
        class="shadeCell"
        style={{
          backgroundColor: `hsl(${props.hue},
              ${props.sat}%,
              ${props.lig}%)`,
        }}
      >
        <div
          className="currentColorMarker"
          style={{
            backgroundColor: `${
              props.thisIsCurrentColor ? `#FFFFFF50` : `transparent`
            }`,
          }}
        >
          {" "}
        </div>
      </div>
      <span className="shadeCellLabel">{props.hex}</span>
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