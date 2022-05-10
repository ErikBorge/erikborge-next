import { useState, useRef, useEffect } from "react";
import MUISlider from "@mui/material/Slider";
import confetti from "canvas-confetti";
import cn from "classnames";

let initialAnnoyingFactor = 2;
let annoyingFactor = 2;
let mouseX = 0;
let sliderLeftDiff = 0;
const winDelay = 2000;

const DorkySlider = ({
  max,
  sliderValue,
  setSliderValue,
  isInTransit,
  win,
  winLimit,
  setWin,
  solitaire,
}) => {
  const [oldSliderValue, setOldSliderValue] = useState(0);
  const sliderRef = useRef();
  const [sliderBoundingRect, setSliderBoundingRect] = useState(
    sliderRef?.current?.getBoundingClientRect()
  );
  const [localWin, setLocalWin] = useState(false);

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
    annoyingFactor = initialAnnoyingFactor;
  };

  useEffect(() => {
    if (sliderValue > winLimit && !localWin) {
      confetti({
        particleCount: 250,
        spread: 100,
      });
      setLocalWin(true);
      setTimeout(() => {
        setWin(true);
        resetValues();
      }, winDelay);
    }
    if (sliderValue < winLimit && localWin) {
      //   setWin(false);
      setLocalWin(false);
      setOldSliderValue(0);
    }
    annoyingFactor = initialAnnoyingFactor + Math.pow(1 + sliderValue / max, 6); // = 10 + sliderValue / 10;
  }, [sliderValue, win, localWin]);

  return (
    <div className="dorky-slider">
      <div className="dorky-slider__title">
        <h2>slide and win</h2>
      </div>
      <div
        className={cn(
          "dorky-slider__slider",
          {
            "dorky-slider__slider--hidden": solitaire,
          },
          {
            "dorky-slider__slider--completed": localWin,
          }
        )}
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
