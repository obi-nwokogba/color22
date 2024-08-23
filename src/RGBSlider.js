import Draggable from "react-draggable";
import { useState } from "react";
import "./styles.css";

export default function RGBSlider(props) {
  // super(props);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sliderXPos, setSliderXPos] = useState(100);
  // const [E, setE] = useState(60);

  const trackPos = (e, data, compone) => {
    // setSliderXPos(data.x);
    // if (compone === "R") {
    // console.log("R moved");
    // console.log(`data.x is ${data.x}`);
    // let trueValue = Math.floor(((data.x + 335) / 670) * 255);
    // props.func(compone, trueValue);
    // setSliderXPos({ x: data.x, y: 0 });
    // position.x = data.x;
  };

  const setPos = (e, data, compone) => {
    console.log(compone, " moved");
    console.log(`data.x is ${data.x}`);
    let trueValue = Math.floor(((data.x + 335) / 670) * 255);
    props.func(compone, trueValue);

    // setE(e.lastX);
    // setPosition({ x: Number(23), y: 0 });
    // setSliderXPos({ x: Number(23), y: 0 });
    // setPosition({ x: Number(data.x), y: 0 });

    // let trueValue = Math.floor(((e.x + 335) / 670) * 255);

    // props.sliderXPosition = E;
    // props.func(compone, trueValue);

    // props.position = { x: 23, y: 0 };
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
          onDrag={(e, data) => trackPos(e, data, props.colorComponent)}
          onStop={(e, data) => setPos(e, data, props.colorComponent)}
        >
          <div className="sliderControl">{props.colorComponent}</div>
        </Draggable>
      </div>
    </>
  );
}
