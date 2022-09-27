import { useState } from "react";
import dynamic from "next/dynamic";
import Slider from "../../Slider/Slider";
import { mapNumberToRangeFromRange } from "../../../src/helpers";
import { colorDistance } from "../../../src/rainbowSmoke";

import Controls from "../../Controls/Controls";

// const w = 432;
// const h = 432;
const numOfCols = 216;
const numOfRows = numOfCols;
const num = numOfCols * numOfRows;
const perCycle = 50;

let occupiedPixels = new Array(num).fill(-1);
let colors = new Array(num).fill(null);
let currPos = Math.floor(num / 2 + numOfCols / 2);
let prevPos = currPos;
const startIndex = currPos;
let adjacentPixels, currColor, nextPixel;
let hasFinished = false;

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const RainbowSmoke = ({ isInTransit, frameSize }) => {
  const [w, setWidth] = useState(0);
  const [h, setHeight] = useState(0);
  const [dim, setDim] = useState(0);
  const [p5, setP5] = useState(null);

  const addColors = (arr) => {
    const cbrt = Math.cbrt(num);
    arr = arr.map(() => ({ r: 0, g: 0, b: 0 }));

    let colorIndex = 0;
    const colorOffset = 0;
    for (let r = colorOffset; r < colorOffset + cbrt; r++) {
      for (let g = colorOffset; g < colorOffset + cbrt; g++) {
        for (let b = colorOffset; b < colorOffset + cbrt; b++) {
          arr[colorIndex] = {
            r: mapNumberToRangeFromRange(
              r,
              colorOffset,
              colorOffset + cbrt,
              0,
              255
            ),
            g: mapNumberToRangeFromRange(
              g,
              colorOffset,
              colorOffset + cbrt,
              0,
              255
            ),
            b: mapNumberToRangeFromRange(
              b,
              colorOffset,
              colorOffset + cbrt,
              0,
              255
            ),
          };
          colorIndex += 1;
        }
      }
    }

    return arr;
  };

  const indexToPos = (index) => {
    return [(index % (w / dim)) * dim, Math.floor(index / (w / dim)) * dim];
  };

  const indexToXY = (index) => {
    return [index % (w / dim), Math.floor(index / (w / dim))];
  };

  const posToIndex = (pos) => {
    return pos.y * (w / dim) + pos.x;
  };

  const getAdjacentPixels = (index) => {
    return [
      index < w / dim ? -1 : index - w / dim,
      (index + 1) % (w / dim) === 0 ? -1 : index + 1,
      index >= num - w / dim ? -1 : index + w / dim,
      index % (w / dim) === 0 ? -1 : index - 1,
    ];
  };

  const getAvailableAdjacentPixel = (arr) => {
    let availableAdjacentPixels = arr.filter(
      (index) => index && occupiedPixels[index] === -1
    );
    return availableAdjacentPixels.length >= 1
      ? p5.random(availableAdjacentPixels)
      : -1;
  };

  const findPixelWithAvailableAdjacentPixel = () => {
    let adjP = null;
    let avAdjP = null;
    let availablePixelsWithOccupiedNeighbour = [];
    let pos;
    occupiedPixels.forEach((p, i) => {
      if (p !== -1) {
        adjP = getAdjacentPixels(i);
        avAdjP = getAvailableAdjacentPixel(adjP);
        if (avAdjP !== -1) {
          pos = indexToXY(avAdjP);
          availablePixelsWithOccupiedNeighbour.push({
            vector: p5.createVector(pos[0], pos[1]),
          });
        }
      }
    });
    const startPos = indexToXY(startIndex);
    const startPosVector = p5.createVector(startPos[0], startPos[1]);
    availablePixelsWithOccupiedNeighbour =
      availablePixelsWithOccupiedNeighbour.map((pixel) => ({
        ...pixel,
        distance: pixel.vector.dist(startPosVector),
      }));
    let minDistance = availablePixelsWithOccupiedNeighbour[0];
    availablePixelsWithOccupiedNeighbour.forEach((p) => {
      if (p.distance < minDistance.distance) {
        minDistance = p;
      }
    });
    if (minDistance) {
      return posToIndex(minDistance.vector);
    } else {
      return -1;
    }
  };

  const getClosestColor = (color) => {
    let colorDistances = colors.map((c) => ({
      color: c,
      distance: colorDistance(color, c),
    }));
    let minDistance = colorDistances[0];
    colorDistances.forEach((c) => {
      if (c.distance < minDistance.distance) {
        minDistance = c;
      }
    });

    return {
      color: minDistance.color,
      colorIndex: colors.indexOf(minDistance.color),
    };
  };

  // uses the color of the previous drawn pixel
  const drawPixelFromPrevIndex = (index, prevIndex) => {
    let pos = indexToPos(index);
    if (index === prevIndex) {
      let color = p5.random(colors);
      p5.fill(color.r, color.g, color.b);
      p5.rect(pos[0], pos[1], dim, dim);
      return color;
    } else {
      let prevColor = occupiedPixels[prevIndex];
      let { color, colorIndex } = getClosestColor(prevColor);
      p5.fill(color.r, color.g, color.b);
      p5.rect(pos[0], pos[1], dim, dim);
      colors.splice(colorIndex, 1);
      return color;
    }
  };

  // uses the color of a random neighbour pixel that is occupied
  const drawPixelFromNeighbours = (index) => {
    let pos = indexToPos(index);
    if (index === startIndex) {
      let color = p5.random(colors);
      p5.fill(color.r, color.g, color.b);
      p5.rect(pos[0], pos[1], dim, dim);
      return color;
    } else {
      let neighbourIndex = p5.random(
        getAdjacentPixels(index).filter(
          (pIndex) => pIndex !== -1 && occupiedPixels[pIndex] !== -1
        )
      );
      let neighbourColor = occupiedPixels[neighbourIndex];
      let { color, colorIndex } = getClosestColor(neighbourColor);
      p5.fill(color.r, color.g, color.b);
      p5.rect(pos[0], pos[1], dim, dim);
      colors.splice(colorIndex, 1);
      return color;
    }
  };

  function render() {
    if (currPos !== -1) {
      currColor = drawPixelFromNeighbours(currPos, prevPos);
      occupiedPixels[currPos] = currColor;
      adjacentPixels = getAdjacentPixels(currPos);
      nextPixel = getAvailableAdjacentPixel(adjacentPixels);
      prevPos = currPos;
      currPos = nextPixel;
    } else {
      currPos = findPixelWithAvailableAdjacentPixel();
      if (currPos === -1) {
        hasFinished = true;
      }
    }
  }

  const setup = (p, canvasParentRef, ref) => {
    setP5(p);

    p.createCanvas(frameSize.width, frameSize.height).parent(canvasParentRef);
    p.noStroke();

    setWidth(frameSize.width);
    setHeight(frameSize.height);
    setDim(frameSize.width / numOfCols);
    colors = addColors(colors);

    // console.log("start");
    // console.log("occupiedPixels", occupiedPixels);
    // console.log("colors", colors);
  };

  const draw = (p) => {
    if (hasFinished === true) {
      //   console.log("finished");
      //   console.log("occupiedPixels", occupiedPixels);
      //   console.log("colors", colors);
      p5.noLoop();
    }
    for (let i = 0; i <= perCycle; i++) {
      render();
    }
  };

  if (isInTransit) return null;

  return (
    <div className="rainbow-smoke" id="rainbow-smoke">
      {/* <Controls>
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
      </Controls> */}
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default RainbowSmoke;
