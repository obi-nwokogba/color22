import Draggable from "react-draggable";
import { useState } from "react";
import "./styles.css";

export default function RGBSlider(props) {
  const [sliderValue, setSliderValue] = useState();

  const trackPos = (e, data, compone, hasBeenReleased) => {
    let newXValue = data.x <= -355 ? -355 : data.x;
    let trueValue = Math.floor(((newXValue + 335) / 670) * 255);
    setSliderValue(trueValue);
    props.func(compone, trueValue, hasBeenReleased);
  };

  const setPos = (e, data, compone, hasBeenReleased) => {
    let newXValue = data.x <= -355 ? -355 : data.x;
    let trueValue = Math.floor(((newXValue + 335) / 670) * 255);
    setSliderValue(trueValue);
    props.func(compone, trueValue, hasBeenReleased);
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
          onStart={(e, data) => trackPos(e, data, props.colorComponent, false)}
          onStop={(e, data) => setPos(e, data, props.colorComponent, true)}
        >
          <div className="sliderControl">
            {props.colorComponent} {sliderValue}
          </div>
        </Draggable>
      </div>
    </>
  );
}
