import { useEffect, useRef, useState } from "react";
// import Sketch from "react-p5";
import dynamic from "next/dynamic";
import motion from "framer-motion";
import { getRandomInt, Branch, BranchSystem } from "../../public/src/branches";
import ExpandButton from "../../public/components/ExpandButton/ExpandButton";
import Slider from "../../public/components/Slider/Slider";
import cn from "classnames";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

let pagePadding = 0;
let lineWidth = 8;
let randomY, lastRandomY, system, lastBranch, startPositionX;
let color, color1, color2, color3;
// let spread = 20;
// let spacing = 10;
// let speed = 2;
let hasPutFirstBranch = false;
let maxSpread;

const Branches = ({ isInTransit, frameSize }) => {
  const branchRef = useRef(null);
  const [controllerIsOpen, setControllerIsOpen] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [spread, setSpread] = useState(30);
  const [spacing, setSpacing] = useState(10);

  const setup = (p, canvasParentRef, ref) => {
    p.createCanvas(
      frameSize.width - 2 * pagePadding,
      frameSize.height - 2 * pagePadding
    ).parent(canvasParentRef);
    p.strokeWeight(lineWidth);
    p.strokeCap(p.SQUARE);

    startPositionX = p.width; //(p.width * 3) / 4;
    lastRandomY = p.width / 2;
    randomY = 0;
    system = new BranchSystem();

    maxSpread = frameSize.height;
    console.log("maxSpread", maxSpread);
  };

  const draw = (p) => {
    p.background(255);
    system.run(p);

    randomY = Math.min(
      Math.max(0, getRandomInt(lastRandomY - spread, lastRandomY + spread)),
      p.height
    );
    color1 = getRandomInt(130, 255);
    color2 = getRandomInt(130, 255);
    color3 = getRandomInt(Math.min(color1, color2), 255);
    color = p.color(color1, color2, color3);

    if (!hasPutFirstBranch) {
      lastBranch = system.addBranch(startPositionX, randomY, speed, color, p);
      lastRandomY = randomY;
      hasPutFirstBranch = true;
    } else {
      if (startPositionX - lastBranch.posX > spacing) {
        lastBranch = system.addBranch(startPositionX, randomY, speed, color, p);
        lastRandomY = randomY;
      }
    }
    system.setSpeed(speed);
  };

  const increaseSpeed = () => {
    speed += 1;
    if (speed > 100) {
      speed = 100;
    }
  };

  const decreaseSpeed = () => {
    speed -= 1;
    if (speed < 0) {
      speed = 0;
    }
  };

  const increaseSpread = () => {
    spread = Math.min(spread + 10, maxSpread);
  };

  const decreaseSpread = () => {
    spread = Math.max(spread - 10, 0);
  };

  const changeSpread = (e) => {
    setSpread(Math.max(Math.min(e.target.value, maxSpread), 0));
  };

  if (isInTransit) return null;

  return (
    <div className="branches" id="branches" ref={branchRef}>
      <div
        className={cn("branches__controls", {
          "branches__controls--open": controllerIsOpen,
        })}
      >
        <div className="branches__controls-top">
          Controls
          <ExpandButton
            onClick={() => setControllerIsOpen((prev) => !prev)}
            isExpanded={controllerIsOpen}
          />
        </div>
        {controllerIsOpen && (
          <>
            <div>
              hastighet
              <Slider
                value={speed}
                min={0}
                max={30}
                step={1}
                onChange={(e) => setSpeed(e.target.value)}
              />
            </div>
            <div>
              tilfeldighet
              <Slider
                value={spread}
                min={0}
                max={maxSpread / 2}
                step={10}
                onChange={changeSpread}
              />
            </div>
            <div>
              mellomrom
              <Slider
                value={spacing}
                min={lineWidth - 2}
                max={40}
                step={1}
                onChange={(e) => setSpacing(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Branches;

export async function getStaticProps() {
  return { props: { layoutProps: ["noPadding", "noOverflow"] } };
}
