import anime from "animejs";
import { useState, useRef, useEffect } from "react";
import Controls from "../../Controls/Controls";
import Slider from "../../Slider/Slider";
import { mapNumberToRangeFromRange } from "../../../src/helpers";

let ballH = 30;
let ballW = 30;
let xNum, yNum;

const Ballz = ({ isInTransit }) => {
  const [sizeSpread, setSizeSpread] = useState(7);
  const [duration, setDuration] = useState(6);
  const [delay, setDelay] = useState(1.5);
  const animation = useRef(null);
  const ballzContainerRef = useRef(null);
  const [rect, setRect] = useState(null);
  const [matrix, setMatrix] = useState({
    num: null,
    x: null,
    y: null,
    offsetX: null,
  });

  useEffect(() => {
    if (!isInTransit) {
      const size = ballzContainerRef.current.getBoundingClientRect();
      const x = Math.floor(size.width / ballW);
      const y = Math.floor(size.height / ballH);
      setMatrix({
        num: Array.from(Array(x * y)),
        x: x,
        y: y,
        offsetX: (size.width % ballW) / 2,
      });
      setRect(size);
    }
  }, [isInTransit]);

  const generateAnimation = (x, y) => {
    xNum = Math.min(Math.ceil((-matrix.offsetX + x) / ballW), matrix.x);
    yNum = Math.min(Math.ceil(y / ballH), matrix.y);

    animation.current = anime({
      targets: ".ballz .ballz__ball",
      scale: [
        {
          value: 0.9 - mapNumberToRangeFromRange(sizeSpread, 1, 10, 0, 0.9),
          easing: "easeOutSine",
          duration: mapNumberToRangeFromRange(duration, 1, 10, 0.5, 3) * 100,
        },
        {
          value: mapNumberToRangeFromRange(sizeSpread, 1, 10, 1, 1.5),
          easing: "easeInOutSine",
          duration: mapNumberToRangeFromRange(duration, 1, 10, 0.5, 3) * 200,
        },
        {
          value: 1,
          easing: "easeInOutQuad",
          duration: mapNumberToRangeFromRange(duration, 1, 10, 0.5, 3) * 100,
        },
      ],
      delay: anime.stagger(
        mapNumberToRangeFromRange(delay, 1, 10, 0.5, 5) * 100,
        {
          grid: [matrix.x, matrix.y],
          from: (yNum - 1) * matrix.x + xNum - 1,
        }
      ),
    });
  };

  const handleClick = (e) => {
    generateAnimation(e.clientX - rect.left, e.clientY - rect.top);
    animation.current.play();
  };

  return (
    <div className="ballz" onClick={handleClick} ref={ballzContainerRef}>
      <Controls className={"ballz__controls"}>
        <div>
          størrelsesforskjell
          <Slider
            value={sizeSpread}
            min={1}
            max={10}
            step={0.1}
            onChange={(e) => setSizeSpread(e.target.value)}
          />
        </div>
        <div>
          varighet
          <Slider
            value={duration}
            min={1}
            max={10}
            step={0.1}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          forsinkelse
          <Slider
            value={delay}
            min={1}
            max={10}
            step={0.1}
            onChange={(e) => setDelay(e.target.value)}
          />
        </div>
      </Controls>
      <div
        className="ballz__container"
        style={{
          transform: `translateX(${matrix.offsetX}px)`,
        }}
      >
        {matrix.num?.map((_, i) => (
          <div className="ballz__ball" key={"ballz__ball-" + i}></div>
        ))}
      </div>
    </div>
  );
};

export default Ballz;
