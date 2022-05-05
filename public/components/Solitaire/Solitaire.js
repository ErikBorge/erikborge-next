import dynamic from "next/dynamic";
import { useEffect } from "react";

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
let compensateX = 150;
let compensateY = 100;
let maxDim = 150;

const Solitaire = ({ frameSize, setSolitaire }) => {
  const setup = (p, canvasParentRef) => {
    const cnv = p
      .createCanvas(frameSize.width, frameSize.height)
      .parent(canvasParentRef);

    loadImages();

    cnv.mouseMoved((event) => {
      event.preventDefault();
      event.stopPropagation();
      if (p.mouseIsPressed) {
        mouseMoved(event, p);
      }
    });
    // cnv.mouseReleased((event) => {
    //   event.preventDefault();
    //   mouseUp(event, p);
    // });
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

  const throwCard = (x, y, p) => {
    var variable1 = Math.floor(Math.random() * 6 - 3) * 2; //hele tall [-6, 6]
    var variable2 = -Math.random() * 16; //desimaltall (-16, 0]
    var pictureChoice = Math.floor(Math.random() * images.length);
    var particle = new Particle(
      x,
      y,
      variable1,
      variable2,
      images[pictureChoice],
      p
    );
    particles.push(particle);
  };

  const mousePressed = (p, event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log("mousePressed");
    throwCard(event.clientX - compensateX, event.clientY - compensateY, p);
    // p.mouseMoved((e) => mouseMoved(e, p));
  };

  const mouseMoved = (event, p) => {
    throwCard(event.clientX - compensateX, event.clientY - compensateY, p);
  };

  const mouseUp = (event, p) => {
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

  // useEffect(() => {
  //   return () => {
  //     console.log("removing event listener");
  //     window.removeEventListener("mousedown", mousePressed);
  //   };
  // });

  return (
    <div className="solitaire">
      <div className="solitaire__close">
        <button onClick={() => setSolitaire(false)}>x</button>
      </div>
      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
    </div>
  );
};

export default Solitaire;
