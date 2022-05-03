import Link from "next/link";
import { useEffect, useRef } from "react";
// import confetti from "https://cdn.skypack.dev/canvas-confetti@1";
import confetti from "canvas-confetti";

const buffer = 10;

const ImpossibleButton = () => {
  const button = useRef();
  const container = useRef();

  const handleClick = () => {
    confetti({
      particleCount: 150,
      spread: 60,
    });
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  };

  const mouseMove = (e) => {
    if (button.current) {
      const withinBoundaries = e.composedPath().includes(button.current);
      if (withinBoundaries) {
        moveButton(e.clientX, e.clientY);
        sleep(20);
      }
    }
  };

  const moveButton = (x, y) => {
    let newX = getRandomInt(
      0,
      container.current.clientWidth - button.current.clientWidth
    );
    let newY = getRandomInt(
      0,
      container.current.clientHeight - button.current.clientHeight
    );
    if (
      Math.abs(newX - button.current.style.left) <
        button.current.offsetWidth + buffer ||
      Math.abs(newY - button.current.style.top) <
        button.current.offsetHeight + buffer
    ) {
      console.log("going again");
      moveButton(x, y);
    } else {
      button.current.style.left = `${newX}px`;
      button.current.style.top = `${newY}px`;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMove);
    return () => document.removeEventListener("mousemove", mouseMove);
  });

  return (
    <div className="impossible-button">
      <div className="impossible-button__container">
        <div ref={container} className="impossible-button__buttonContainer">
          <div ref={button} className="impossible-button__buttonBackdrop">
            <Link href={"/tjafs"}>
              <a onClick={handleClick} className="impossible-button__myButton">
                Tilbake
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpossibleButton;
