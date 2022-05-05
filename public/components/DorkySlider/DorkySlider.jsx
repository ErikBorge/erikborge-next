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

  //   console.log("slider br", sliderBoundingRect);

  const onSliderChange = (e, value) => {
    // console.log(
    //   "val",
    //   value,
    //   "sval",
    //   sliderValue,
    //   "old",
    //   oldSliderValue,
    //   "af",
    //   annoyingFactor
    // );

    mouseX = e.clientX;
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
    //   const mouseMove = (e) => {
    //     e.preventDefault();
    //       sliderLeftDiff = e.clientX - sliderBoundingRect.left
    //   };
    //   const mouseDown = (e) => {
    //     e.preventDefault();
    //     window.addEventListener("mousemove", mouseMove, false);
    //     //   setOldSliderValue(sliderValue);
    //     // annoyingFactor = 10 - sliderValue / 10;
    //   };
    const mouseUp = (e) => {
      setOldSliderValue(sliderValue);
      // annoyingFactor = 10 - sliderValue / 10;
      // console.log("removing mousemove and mousedown");
      // window.removeEventListener("mousedown", mouseDown);
      // window.removeEventListener("mousemove", mouseMove);
    };

    //   window.addEventListener("mousedown", mouseDown, false);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      // window.removeEventListener("mousedown", mouseDown);
      // window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  });

  useEffect(() => {
    setSliderBoundingRect(sliderRef.current?.getBoundingClientRect());
  }, [isInTransit, sliderRef]);

  useEffect(() => {
    if (sliderValue > winLimit && !localWin) {
      confetti({
        particleCount: 250,
        spread: 100,
      });
      setLocalWin(true);
      setTimeout(() => {
        setSliderValue(0);
        setWin(true);
      }, winDelay);
    }
    if (sliderValue < winLimit && localWin) {
      //   setWin(false);
      setLocalWin(false);
      setOldSliderValue(0);
    }
    annoyingFactor = initialAnnoyingFactor + Math.pow(1 + sliderValue / max, 6); // = 10 + sliderValue / 10;
  }, [sliderValue, win, localWin]);

  //   useEffect(() => {
  //     if (solitaire){
  //         setSliderValue(0)
  //     }
  //   }, [solitaire])
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
          defaultValue={0} //{(min + max) / 2}
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
