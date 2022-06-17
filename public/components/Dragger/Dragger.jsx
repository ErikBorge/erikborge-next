import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import cn from "classnames";

const Dragger = ({ setSolitaire, setDropPosition }) => {
  const cardRef = useRef();
  const binRef = useRef();
  const [isInBin, setIsInBin] = useState(false);

  const isCardInBin = (card, bin) => {
    // console.log(card.x > bin.x);
    if (
      card.left > bin.left &&
      card.right < bin.right &&
      card.top > bin.top &&
      card.bottom < bin.bottom
    ) {
      setIsInBin(true);
      setDropPosition({
        x: (bin.left + bin.right) / 2,
        y: (bin.top + bin.bottom) / 2,
      });
      setSolitaire(true);
    } else {
      setIsInBin(false);
    }
  };
  //   useEffect(() => {
  //     if (isInBin) {

  //     }
  //   }, [isInBin]);

  const handleDrag = (e) => {
    isCardInBin(
      cardRef.current.getBoundingClientRect(),
      binRef.current.getBoundingClientRect()
    );
    // let x = e.clientX;
    // let y = e.clientY;
  };
  return (
    <div className="dragger">
      <Draggable
        axis="both"
        handle=".dragger__puzzle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        //   grid={[25, 25]}
        //   scale={1}
        onStart={() => {}}
        onDrag={(e) => handleDrag(e)}
        onStop={() => {}}
      >
        {/* <div className="dragger__card" ref={cardRef}>
          DRAG
        </div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 121 121"
          className="dragger__puzzle"
          ref={cardRef}
        >
          <path
            d="M359 284.69h30v-30a20 20 0 0 1 0-40v-30h-30a20 20 0 0 0-40 0h-30v30a20 20 0 0 0 0 40v30h30a20 20 0 0 1 40 0Z"
            transform="translate(-268.51 -164.19)"
            style={{
              fill: "#FBF9F2",
              stroke: "#000",
              strokeMiterlimit: 10,
            }}
          />
        </svg>
      </Draggable>
      {/* <div
        className={cn("dragger__bin", { "dragger__bin--active": isInBin })}
        ref={binRef}
      ></div> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 121 121"
        className="dragger__puzzle-bin"
        ref={binRef}
      >
        <path
          d="M359 284.69h30v-30a20 20 0 0 1 0-40v-30h-30a20 20 0 0 0-40 0h-30v30a20 20 0 0 0 0 40v30h30a20 20 0 0 1 40 0Z"
          transform="translate(-268.51 -164.19)"
          style={{
            fill: "none",
            stroke: "#000",
            strokeMiterlimit: 10,
            strokeDasharray: "5 7",
          }}
        />
      </svg>
    </div>
  );
};

export default Dragger;
