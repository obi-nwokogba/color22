import Draggable from "react-draggable";
import { useState } from "react";
import "./styles.css";

export default function RGBSlider(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sliderXPos, setSliderXPos] = useState(100);
  const [E, setE] = useState(60);

  const trackPos = (e, data) => {
    setE(e.x);
  };

  const setPos = (e, data, compone) => {
    setE(e.lastX);
    setPosition({ x: Number(e.x), y: 0 });

    let trueValue = Math.floor(((e.x + 335) / 670) * 255);

    if (compone == "R") {
      props.sliderXPosition = 0;
    }

    if (compone == "G") {
      props.sliderXPosition = 50;
    }

    if (compone == "B") {
      props.sliderXPosition = 100;
    }
    // props.sliderXPosition = E;
    props.func(compone, trueValue);

    // props.sliderXPosition = data.x;
  };

  return (
    <>
      <div className="sliderContainer">
        <Draggable
          axis="x"
          bounds={{ left: -335, right: 335 }}
          defaultPosition={{ x: props.sliderXPosition, y: 0 }}
          position={{
            x: Number(props.sliderXPosition)
              ? Number(props.sliderXPosition)
              : null,
            y: 0,
          }}
          grid={[2, 2]}
          scale={1}
          onStart={(e, data) => trackPos(e, data)}
          onStop={(e, data) => setPos(e, data, props.colorComponent)}
        >
          <div className="sliderControl">
            {props.colorComponent} :{E}:
          </div>
        </Draggable>
      </div>
    </>
  );
}
