import { useState } from "react";
import dynamic from "next/dynamic";
import { BranchSystem } from "../../../src/branches";
import { getRandomInt } from "../../../src/helpers";
import Slider from "../../Slider/Slider";

import Controls from "../../Controls/Controls";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

let pagePadding = 0;
let lineWidth = 8;
let randomY, lastRandomY, system, lastBranch, startPositionX;
let color, color1, color2, color3;
let maxSpread;

const Branches = ({ isInTransit, frameSize }) => {
  const [hasPutFirstBranch, setHasPutFirstBranch] = useState(false);
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

    maxSpread = frameSize.height / 2;
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
      console.log("hey");
      lastBranch = system.addBranch(startPositionX, randomY, speed, color, p);
      lastRandomY = randomY;
      setHasPutFirstBranch(true);
    } else {
      if (startPositionX - lastBranch.posX > spacing) {
        lastBranch = system.addBranch(startPositionX, randomY, speed, color, p);
        lastRandomY = randomY;
      }
    }
    system.setSpeed(speed);
  };

  if (isInTransit) return null;

  return (
    <div className="branches" id="branches">
      <Controls>
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
              max={maxSpread}
              step={1}
              onChange={(e) => setSpread(e.target.value)}
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
      </Controls>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Branches;
