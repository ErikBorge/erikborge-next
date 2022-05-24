import { useState, useRef, useEffect } from "react";
import MUISlider from "@mui/material/Slider";
import confetti from "canvas-confetti";
import cn from "classnames";
import Controls from "../Controls/Controls";
import Slider from "../Slider/Slider";

let initialAnnoyingFactor = 2;

let mouseX = 0;
let sliderLeftDiff = 0;
const winDelay = 2000;

let max = 99.5;
let winLimit = 99;

const DorkySlider = ({ isInTransit }) => {
  const [sliderValue, setSliderValue] = useState(0.5);
  const [oldSliderValue, setOldSliderValue] = useState(0);
  const sliderRef = useRef();
  const [sliderBoundingRect, setSliderBoundingRect] = useState(
    sliderRef?.current?.getBoundingClientRect()
  );
  const [annoyingFactor, setAnnoyingFactor] = useState(initialAnnoyingFactor);
  const [annoyingFactorSlider, setAnnoyingFactorSlider] = useState(0);
  const [win, setWin] = useState(false);

  const onSliderChange = (e, value) => {
    if (
      e.type === "touchmove" ||
      (e.type === "touchstart" && e.touches[0].clientX !== undefined)
    ) {
      mouseX = e.touches[0].clientX;

      //   for ( var i = 0; i < event.touches.length; i ++ ) {
    } else {
      mouseX = e.clientX || sliderBoundingRect.left;
    }

    let range = max / sliderBoundingRect.width;
    sliderLeftDiff = (mouseX - sliderBoundingRect.left) * range;

    let newValue =
      sliderLeftDiff / annoyingFactor +
      oldSliderValue -
      oldSliderValue / annoyingFactor;
    newValue = Math.min(Math.max(newValue, 0), max);
    newValue = Math.round(newValue * 100) / 100;

    setSliderValue(newValue);
  };

  useEffect(() => {
    const touchEnd = (e) => {
      e.stopPropagation();
      setOldSliderValue(sliderValue);
    };
    const mouseUp = (e) => {
      setOldSliderValue(sliderValue);
    };

    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("touchend", touchEnd);

    return () => {
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("touchend", touchEnd);
    };
  });

  useEffect(() => {
    setSliderBoundingRect(sliderRef.current?.getBoundingClientRect());
  }, [isInTransit, sliderRef]);

  const resetValues = () => {
    setSliderValue(0);
    setOldSliderValue(0);
    setAnnoyingFactor(initialAnnoyingFactor);
  };

  useEffect(() => {
    if (sliderValue > winLimit) {
      setWin(true);
      confetti({
        particleCount: 250,
        spread: 100,
      });
      setTimeout(() => {
        resetValues();
        setWin(false);
      }, winDelay);
    }
    setAnnoyingFactor(
      initialAnnoyingFactor + Math.pow(1 + sliderValue / max, 6)
    ); // = 10 + sliderValue / 10;
  }, [sliderValue]);

  const onChangeAnnoyingFactorSlider = (val) => {
    console.log("slider", val, "annoyingF", annoyingFactor);
    // let maxAF = initialAnnoyingFactor + Math.pow(1 + 100 / max, 6);
    // let minAF = initialAnnoyingFactor;
    // let currAF = annoyingFactor / maxAF;
    // let maxIn = maxAF -
    // // output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start)
    // let newVal =
    // let newVal = min + ((max - min) / maxDist - min) * (dist - min);

    // setAnnoyingFactor((prev) => prev + val);
    // setAnnoyingFactorSlider(val);
  };

  return (
    <div className="dorky-slider">
      <Controls>
        <div>
          samarbeidsvillighet
          <Slider
            value={annoyingFactorSlider}
            min={-2}
            max={20}
            step={0.01}
            onChange={(e) => onChangeAnnoyingFactorSlider(e.target.value)}
          />
        </div>
      </Controls>
      <div className="dorky-slider__title">
        <h2>slide and win</h2>
      </div>
      <div
        className={cn("dorky-slider__slider", {
          "dorky-slider__slider--completed": win,
        })}
        ref={sliderRef}
      >
        <MUISlider
          defaultValue={0}
          value={sliderValue}
          step={1}
          min={0}
          max={max}
          onChange={(e, val) => onSliderChange(e, val)}
        />
      </div>
    </div>
  );
};

export default DorkySlider;
