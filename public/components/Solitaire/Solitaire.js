import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const originalImages = [
  "/assets/solitaire/1.png",
  "/assets/solitaire/2.jpeg",
  "/assets/solitaire/3.jpg",
  "/assets/solitaire/4.jpg",
  "/assets/solitaire/5.jpg",
  "/assets/solitaire/6.jpg",
];
let images = [];
let particles = [];
//experimental
let compensateX = 0;
let compensateY = 0;
let maxDim = 150;

const Solitaire = ({
  solitaire,
  frameSize,
  setSolitaire,
  dropPosition,
  isInTransit,
}) => {
  const containerRef = useRef();

  useEffect(() => {
    loadImages();
  }, []);

  const setup = (p, canvasParentRef) => {
    const cnv = p
      .createCanvas(frameSize.width, frameSize.height)
      .parent(canvasParentRef);

    cnv.mouseMoved((event) => {
      event.preventDefault();
      event.stopPropagation();
      if (p.mouseIsPressed) {
        mouseMoved(event, p);
      }
    });
    cnv.touchStarted((event) => {
      event.preventDefault();
      event.stopPropagation();
      touchStarted(event, p);
    });
    cnv.touchMoved((event) => {
      event.preventDefault();
      event.stopPropagation();
      touchMoved(event, p);
    });
    p.background(200);

    throwCard(dropPosition.x, dropPosition.y, p);
  };

  const draw = (p) => {
    let i = 0;
    let l = particles.length;
    while (i < l) {
      particles[i].update() ? i++ : l--;
    }
  };

  const Particle = function (x, y, sx, sy, img, p) {
    //x y koordinater
    //sx hele tall [-6, 6]
    //sy desimaltall (-16, 0]
    this.imgWidth = img.width;
    this.imgWidthHalf = img.width / 2;
    this.imgHeight = img.height;
    this.imgHeightHalf = img.height / 2;

    if (sx === 0) sx = 2;
    this.update = function () {
      x += sx;
      y += sy;
      if (x < -this.imgWidthHalf || x > p.width + this.imgWidthHalf) {
        var index = particles.indexOf(this);
        particles.splice(index, 1);
        return false;
      }
      if (y > p.height - this.imgHeightHalf) {
        y = p.height - this.imgHeightHalf;
        sy = -sy * 0.85;
      }
      sy += 0.98;
      p.drawingContext.drawImage(
        img,
        Math.floor(x - this.imgWidthHalf),
        Math.floor(y - this.imgHeightHalf),
        this.imgWidth,
        this.imgHeight
      );
      return true;
    };
  };

  const isWithinBounds = (x, y, rect) => {
    return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
  };

  const throwCard = (x, y, p) => {
    const rect = containerRef.current.getBoundingClientRect();
    if (isWithinBounds(x, y, rect)) {
      var variable1 = Math.floor(Math.random() * 6 - 3) * 2; //hele tall [-6, 6]
      var variable2 = -Math.random() * 16; //desimaltall (-16, 0]
      var pictureChoice = Math.floor(Math.random() * images.length);
      var particle = new Particle(
        x - rect.left,
        y - rect.top,
        variable1,
        variable2,
        images[pictureChoice],
        p
      );
      particles.push(particle);
    }
  };

  const mousePressed = (p, event) => {
    // event.preventDefault();
    event.stopPropagation();
    throwCard(event.clientX - compensateX, event.clientY - compensateY, p);
  };

  const mouseMoved = (event, p) => {
    throwCard(event.clientX - compensateX, event.clientY - compensateY, p);
  };

  const touchStarted = (event, p) => {
    for (var i = 0; i < event.changedTouches.length; i++) {
      throwCard(
        event.changedTouches[0].pageX,
        event.changedTouches[0].pageY,
        p
      );
    }
  };

  const touchMoved = (event, p) => {
    for (var i = 0; i < event.touches.length; i++) {
      throwCard(event.touches[i].pageX, event.touches[i].pageY, p);
    }
  };

  const loadImages = () => {
    originalImages.forEach((item) => {
      var image = new Image();
      image.onload = function () {
        let ratio = image.width / image.height;
        if (ratio > 1) {
          image.setAttribute("width", maxDim);
          image.setAttribute("height", maxDim * ratio);
        } else {
          image.setAttribute("width", maxDim * ratio);
          image.setAttribute("height", maxDim);
        }
        images.push(image);
      };
      image.src = item;
    });
  };

  return (
    <div
      className="solitaire"
      ref={containerRef}
      style={{ display: solitaire ? "block" : "none" }}
    >
      <button className="solitaire__close" onClick={() => setSolitaire(false)}>
        lukk x
      </button>
      {/* {!hasClicked && <div className="solitaire__please-click" />} */}
      {solitaire && (
        <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
      )}
    </div>
  );
};

export default Solitaire;
