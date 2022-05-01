import cn from "classnames";
import { useEffect, useRef, useState, createRef } from "react";
import Slider from "../../Slider/Slider";
import Controls from "../../Controls/Controls";
const letters =
  "dksxciwjekropsldkvhyqlwejrjqwertyøvldjnsdj1n2nlcøvæb25llbnø1337fvnnvjsfnvjkdjfGGfsdølllkckwåfvëoirubmørmtømæfgæåbsfhkawhekjrdsfavckmlkerjtlwjrtg";
const lettersArr = [
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
  letters,
];
const HoverLetters = ({ frameSize, isInTransit }) => {
  const containerRef = useRef();
  const coverRefs = useRef([]);
  const numOfCovers = frameSize.height / 21;
  const [hasMounted, setHasMounted] = useState(false);
  const [coverArr, setCoverArr] = useState([]);
  const [animationTime, setAnimationTime] = useState(0.8);
  useEffect(() => {
    if (frameSize.height > 100 && !isInTransit) {
      coverRefs.current = [];
      let newCoverArr = [];
      for (let i = 0; i <= numOfCovers; i++) {
        newCoverArr[i] = "x";
        coverRefs.current[i] = createRef();
      }
      setCoverArr(newCoverArr);
      setHasMounted(true);
    }
  }, [frameSize]);

  useEffect(() => {
    if (hasMounted) {
      coverRefs.current.forEach((ref, i) => {
        if (ref.current) {
          ref.current.style.left = "100%";
        }
      });
    }
  }, [hasMounted]);

  if (isInTransit || !hasMounted) return null;
  return (
    <div className="hover-letters" ref={containerRef}>
      <Controls className="hover-letters__controls">
        <div>
          trail
          <Slider
            value={animationTime}
            min={0.2}
            max={5}
            step={0.01}
            onChange={(e) => setAnimationTime(e.target.value)}
          />
        </div>
      </Controls>

      <div className="hover-letters__letters">
        {!isInTransit &&
          lettersArr.map((letters, i) => {
            return [...letters].map((letter, j) => (
              <span
                key={i + j}
                style={{ animationDuration: animationTime + "s" }}
              >
                {letter}
              </span>
            ));
          })}
      </div>
      {coverArr.map((cover, i) => {
        return (
          <div
            key={"cover-" + i}
            className="hover-letters__cover"
            ref={coverRefs.current[i]}
            style={{
              top: `${21 * i}px`,
              transitionDelay: 0.07 * i + "s",
            }}
          />
        );
      })}
    </div>
  );
};

export default HoverLetters;
